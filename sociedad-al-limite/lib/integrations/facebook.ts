import "server-only";
import { SITE } from "@/lib/config";
import { hoursAgo } from "@/lib/format";
import type { FacebookPost } from "@/lib/types";
import { DEMO_FB_POSTS } from "@/lib/data/demo";

/* =============================================================
   Meta Graph API — publicaciones recientes de la página.
   Credenciales (solo servidor): FACEBOOK_PAGE_ID, FACEBOOK_PAGE_ACCESS_TOKEN
   El token debe ser un token de PÁGINA de larga duración con el
   permiso pages_read_engagement (requiere revisión de la app en Meta).
   Si no está configurado o Meta responde con error, se usa la demo.
   ============================================================= */

const PAGE = process.env.FACEBOOK_PAGE_ID;
const TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const V = process.env.FACEBOOK_GRAPH_VERSION || "v21.0";

export const facebookConfigured = () => Boolean(PAGE && TOKEN);

export async function getFacebookPosts(limit = 3): Promise<FacebookPost[]> {
  const demo = DEMO_FB_POSTS.slice(0, limit).map((p, i) => ({
    id: `demo-${i}`, text: p.text, createdAt: hoursAgo(p.h), url: SITE.social.facebook, image: null, isDemo: true
  }));
  if (!facebookConfigured()) return demo;
  try {
    const url = `https://graph.facebook.com/${V}/${PAGE}/posts?fields=message,created_time,permalink_url,full_picture&limit=${limit}&access_token=${TOKEN}`;
    const r = await fetch(url, { next: { revalidate: 900 } });
    if (!r.ok) throw new Error(`Graph API ${r.status}`);
    const data = await r.json();
    return data.data
      .filter((p: { message?: string }) => p.message)
      .map((p: any) => ({ id: p.id, text: p.message, createdAt: p.created_time, url: p.permalink_url, image: p.full_picture ?? null, isDemo: false }));
  } catch (e) {
    console.error("[facebook] usando demo:", e);
    return demo;
  }
}
