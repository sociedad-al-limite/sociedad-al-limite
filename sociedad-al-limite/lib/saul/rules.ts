import "server-only";
import { CATEGORIES, PRIORITY_PLACES, SITE } from "@/lib/config";
import { norm } from "@/lib/format";
import { getAllArticles, getFeatured, getInterviews, inSection, searchArticles } from "@/lib/data/news";
import { getLatestVideos, getLiveStatus } from "@/lib/integrations/youtube";
import type { Article, CategorySlug, SaulReply } from "@/lib/types";

/* =============================================================
   Motor de reglas de Saul.
   Funciona sin IA externa y es el respaldo si la IA falla.
   Solo devuelve publicaciones que existen en las fuentes del sitio.
   ============================================================= */

export const NO_INFO = "No tengo información confirmada sobre ese tema en las fuentes disponibles de Sociedad al Límite.";

const pick = (a: Article) => ({ slug: a.slug, title: a.title, summary: a.summary, type: a.type, unconfirmed: a.unconfirmed, category: a.category, publishedAt: a.publishedAt });

const PLACES: [string[], string][] = [[["consuelo"], "Consuelo"], [["san pedro", "macoris", "spm"], "San Pedro de Macorís"]];
const CAT_KEYS: [CategorySlug, string[]][] = [
  ["politica", ["politic", "concejo", "regidor", "gobierno"]], ["sociedad", ["sociedad", "social"]],
  ["educacion", ["educa", "escuela", "estudiant", "becas", "universidad", "docente"]], ["religion", ["religi", "iglesia", "pastor"]],
  ["opinion", ["opinion", "columna", "analisis"]], ["denuncias", ["denuncia", "queja", "reclam"]],
  ["nacional", ["nacional", "pais", "republica dominicana"]], ["local", ["local"]]
];

export async function rulesAnswer(message: string): Promise<SaulReply> {
  const q = norm(message);
  const all = await getAllArticles();
  const reply = (text: string, arts: Article[] = []): SaulReply => ({ text, articles: arts.map(pick), source: "reglas" });

  if (/(vivo|transmision|transmitiendo|live|directo)/.test(q)) {
    const live = await getLiveStatus();
    return { ...reply(live.isLive ? `🔴 Sí. Sociedad al Límite está en vivo ahora mismo: «${live.title}».` : "Ahora mismo no estamos transmitiendo. Cuando salgamos en vivo, el botón EN VIVO te llevará directo a la transmisión."), live };
  }
  if (/video/.test(q)) {
    const vids = await getLatestVideos(3);
    const one = /(ultimo|reciente)\b/.test(q) && !/videos/.test(q);
    const list = one ? vids.slice(0, 1) : vids;
    return { ...reply(one ? "🎥 Este es el último video publicado en el canal:" : "🎥 Estos son los últimos videos del canal:"), videos: list.map((v) => ({ id: v.id, title: v.title, url: v.url, duration: v.duration })) };
  }
  if (/entrevist/.test(q)) {
    const [it] = await getInterviews();
    const arts = all.filter((a) => a.type === "entrevista").slice(0, 1);
    if (!it) return reply(NO_INFO);
    return reply(`🎙️ La entrevista más reciente fue con ${it.name} sobre ${it.topic.toLowerCase()}. Lo que dice un entrevistado es su declaración, no una verificación de la redacción.`, arts);
  }
  const place = PLACES.find(([ks]) => ks.some((k) => q.includes(k)));
  if (place) {
    const arts = all.filter((a) => a.places.includes(place[1])).slice(0, 3);
    return arts.length ? reply(`📍 Esto es lo más reciente que hemos publicado sobre ${place[1]}:`, arts) : reply(NO_INFO);
  }
  if (/(mi comunidad|mi barrio|mi sector|comunidad)/.test(q))
    return reply(`📍 ¿De qué comunidad quieres noticias? Por ahora cubrimos con prioridad ${PRIORITY_PLACES.join(" y ")}.`);
  const cat = CAT_KEYS.find(([, ks]) => ks.some((k) => q.includes(k)));
  if (cat) {
    const arts = all.filter((a) => inSection(a, cat[0])).slice(0, 3);
    return arts.length ? reply(`📰 Estas son las publicaciones más recientes de ${CATEGORIES[cat[0]].name}:`, arts) : reply(NO_INFO);
  }
  if (/(hoy|pasando|importante|principal|destacad|relevante|resumen)/.test(q)) {
    const f = await getFeatured();
    const rest = all.filter((a) => a.slug !== f.slug && a.type !== "opinion").sort((a, b) => b.priority - a.priority).slice(0, 2);
    return reply(`🦁 Aquí tienes lo más importante que está pasando, según las publicaciones de ${SITE.name}:`, [f, ...rest]);
  }
  if (/(ultimas|recientes|nuevas)/.test(q)) return reply(`📰 Estas son las últimas publicaciones de ${SITE.name}:`, all.slice(0, 4));
  const found = await searchArticles(message);
  return found.length ? reply(`🔎 Encontré esto en las publicaciones de ${SITE.name}:`, found.slice(0, 3)) : reply(NO_INFO);
}
