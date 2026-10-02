import type { Metadata } from "next";
import { db } from "@/lib/db";
import { CATEGORIES } from "@/lib/config";
import { fmtDate } from "@/lib/format";
import { youtubeConfigured } from "@/lib/integrations/youtube";
import { facebookConfigured } from "@/lib/integrations/facebook";
import { llmConfigured } from "@/lib/saul/llm";
import { pushConfigured } from "@/lib/push";
import ArticleForm from "./ArticleForm";

export const metadata: Metadata = { title: "Panel", robots: { index: false } };
export const dynamic = "force-dynamic";

/* Panel administrativo (protegido por middleware.ts).
   Base lista para crecer: crear/editar/eliminar noticias, destacar,
   marcar "en desarrollo" y "última hora" (envía push), y ver el estado
   de las integraciones. Próximos módulos: entrevistas, videos, redes,
   notas de Saul (modelo SaulNote) y estadísticas (DailyStat). */
export default async function Admin() {
  const prisma = db();
  const rows = prisma ? await prisma.article.findMany({ orderBy: { updatedAt: "desc" }, take: 50, include: { category: true } }) : [];
  const status: [string, boolean][] = [["Base de datos", !!prisma], ["YouTube API", youtubeConfigured()], ["Facebook / Meta", facebookConfigured()], ["IA de Saul", llmConfigured()], ["Notificaciones push", pushConfigured()]];
  return (
    <section className="sec wrap" style={{ display: "grid", gap: 28 }}>
      <div className="sec-head"><h1 className="sec-title"><span className="mark" />Panel de la redacción</h1></div>
      <div className="panel"><div className="panel-title">Integraciones</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>{status.map(([l, ok]) => <li key={l} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span>{l}</span><span className={ok ? "chip" : "chip ghost"}>{ok ? "Conectado" : "Pendiente (.env)"}</span></li>)}</ul>
      </div>
      {prisma ? <ArticleForm categories={Object.entries(CATEGORIES).map(([slug, c]) => ({ slug, name: c.name }))} /> : <div className="notice">Configura DATABASE_URL y ejecuta “npm run db:push” y “npm run db:seed” para activar la gestión de noticias.</div>}
      <div className="panel"><div className="panel-title">Publicaciones recientes</div>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead><tr style={{ textAlign: "left", color: "var(--muted)" }}><th>Título</th><th>Sección</th><th>Estado</th><th>Fecha</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}><td style={{ padding: "8px 8px 8px 0" }}>{r.featured ? "★ " : ""}{r.title}</td><td>{r.category.name}</td><td>{r.status}</td><td>{fmtDate((r.publishedAt ?? r.updatedAt).toISOString())}</td></tr>)}</tbody>
        </table></div>
      </div>
    </section>
  );
}
