import "server-only";
import { db } from "@/lib/db";
import { hoursAgo, norm } from "@/lib/format";
import type { Article, BodyBlock, CategorySlug, ContentType, Interview } from "@/lib/types";
import { DEMO_INTERVIEWS, DEMO_NEWS } from "./demo";

/* =============================================================
   Repositorio de noticias.
   - Con DATABASE_URL: lee de PostgreSQL (lo que publica el panel).
   - Sin DATABASE_URL: usa el contenido de demostración.
   Todo el sitio (páginas, buscador y Saul) pasa por aquí, así que
   cambiar de fuente no requiere tocar los componentes.
   ============================================================= */

function fromDemo(): Article[] {
  return DEMO_NEWS.map((n) => ({
    id: String(n.id),
    slug: n.slug,
    title: n.title,
    subtitle: n.sub,
    summary: n.summary,
    body: n.body as BodyBlock[],
    category: n.cat as CategorySlug,
    type: n.type as ContentType,
    unconfirmed: (n as { status?: string }).status === "no-confirmado",
    featured: !!(n as { featured?: boolean }).featured,
    developing: !!(n as { developing?: boolean }).developing,
    priority: n.priority,
    places: n.places,
    tags: n.tags,
    author: n.author,
    coverUrl: null,
    youtubeId: null,
    views: n.views,
    publishedAt: hoursAgo(n.h),
    isDemo: true
  }));
}

/** Convierte el Markdown guardado en la BD en bloques (párrafos y citas "> texto — fuente"). */
function parseBody(md: string): BodyBlock[] {
  return md.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => {
    if (p.startsWith(">")) {
      const [quote, cite = ""] = p.replace(/^>\s?/, "").split(/\s+—\s+/);
      return { quote: quote.replace(/^["“]|["”]$/g, ""), cite };
    }
    return p;
  });
}

async function fromDb(): Promise<Article[] | null> {
  const prisma = db();
  if (!prisma) return null;
  const rows = await prisma.article.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { publishedAt: "desc" },
    take: 300,
    include: { category: true, author: true }
  });
  return rows.map((r) => ({
    id: r.id, slug: r.slug, title: r.title, subtitle: r.subtitle ?? "", summary: r.summary,
    body: parseBody(r.body), category: r.category.slug as CategorySlug,
    type: r.type.toLowerCase() as ContentType, unconfirmed: r.verification === "NO_CONFIRMADO",
    featured: r.featured, developing: r.developing, priority: r.priority, places: r.places, tags: r.tags,
    author: r.author?.name ?? "Redacción Sociedad al Límite", coverUrl: r.coverUrl, youtubeId: r.youtubeId,
    views: r.views, publishedAt: (r.publishedAt ?? r.createdAt).toISOString(), isDemo: false
  }));
}

export async function getAllArticles(): Promise<Article[]> {
  const rows = (await fromDb()) ?? fromDemo();
  return rows.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getArticle(slug: string) {
  return (await getAllArticles()).find((a) => a.slug === slug) ?? null;
}

export async function getFeatured() {
  const all = await getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export async function getMostRead(limit = 5) {
  return [...(await getAllArticles())].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function inSection(a: Article, s: CategorySlug) {
  if (s === "local") return a.category === "local" || (a.places.length > 0 && a.category === "denuncias");
  if (s === "entrevistas") return a.type === "entrevista";
  if (s === "opinion") return a.type === "opinion";
  if (s === "denuncias") return a.type === "denuncia" || a.category === "denuncias";
  return a.category === s;
}

export async function getBySection(s: CategorySlug) {
  return (await getAllArticles()).filter((a) => inSection(a, s));
}

export async function getByPlace(place: string) {
  return (await getAllArticles()).filter((a) => a.places.includes(place));
}

export async function getRelated(a: Article, limit = 3) {
  const all = (await getAllArticles()).filter((x) => x.slug !== a.slug);
  const rel = all.filter((x) => x.category === a.category || x.places.some((p) => a.places.includes(p)));
  return [...rel, ...all.filter((x) => !rel.includes(x))].slice(0, limit);
}

const STOP = new Set("de la el los las del en y a que un una por para con se al lo es como mas sobre su sus hay ha me mi muestrame dime cual cuales donde quien hoy noticias noticia ultimas ultima pasa paso pasando esta estan informacion quiero saber buscar busca algo".split(" "));

export function terms(q: string) {
  return norm(q).split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));
}

/** Búsqueda por texto en titulares, resúmenes, lugares, etiquetas y cuerpo. */
export async function searchArticles(q: string): Promise<Article[]> {
  const ts = terms(q);
  if (!ts.length) return [];
  const need = Math.max(1, Math.ceil(ts.length * 0.6));
  const text = (a: Article) =>
    norm([a.title, a.summary, a.places.join(" "), a.tags.join(" "), a.category, a.body.map((b) => (typeof b === "string" ? b : b.quote)).join(" ")].join(" "));
  return (await getAllArticles())
    .map((a) => {
      const t = text(a);
      const hits = ts.filter((x) => t.includes(x)).length;
      const titleHits = ts.filter((x) => norm(a.title).includes(x)).length;
      return { a, hits, score: hits + titleHits * 2 };
    })
    .filter((x) => x.hits >= need)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);
}

export async function getInterviews(): Promise<Interview[]> {
  const prisma = db();
  if (prisma) {
    const rows = await prisma.interview.findMany({ orderBy: { publishedAt: "desc" }, take: 24 });
    return rows.map((r) => ({ id: r.id, name: r.guestName, role: r.guestRole ?? "", topic: r.topic, publishedAt: r.publishedAt.toISOString(), articleSlug: r.articleSlug, youtubeId: r.youtubeId, isDemo: false }));
  }
  return DEMO_INTERVIEWS.map((i) => ({ id: String(i.id), name: i.name, role: i.role, topic: i.topic, publishedAt: hoursAgo(i.h), articleSlug: (i as { news?: string }).news ?? null, youtubeId: null, isDemo: true }));
}
