import "server-only";
import webpush from "web-push";
import { db } from "@/lib/db";

/* =============================================================
   Notificaciones de última hora (Web Push, estándar del navegador).
   1. Genera las claves: npm run push:keys
   2. Colócalas en NEXT_PUBLIC_VAPID_PUBLIC_KEY y VAPID_PRIVATE_KEY.
   3. El navegador se suscribe en /api/push/subscribe (con permiso).
   4. Al publicar una noticia marcada "breaking" en el panel, se llama
      a sendBreakingNews() y se avisa a todos los suscriptores.
   ============================================================= */

export const pushConfigured = () => Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);

export async function sendBreakingNews(title: string, url: string) {
  const prisma = db();
  if (!pushConfigured() || !prisma) return { sent: 0, reason: "push o base de datos sin configurar" };
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:redaccion@sociedadallimite.com", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);
  const subs = await prisma.pushSubscription.findMany();
  const payload = JSON.stringify({ title: "🔴 ÚLTIMA HORA", body: title || "Sociedad al Límite acaba de publicar una nueva noticia.", url });
  let sent = 0;
  await Promise.all(subs.map(async (s) => {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload);
      sent++;
    } catch (e: any) {
      if (e?.statusCode === 404 || e?.statusCode === 410) await prisma.pushSubscription.delete({ where: { id: s.id } }); // suscripción vencida
    }
  }));
  return { sent };
}
