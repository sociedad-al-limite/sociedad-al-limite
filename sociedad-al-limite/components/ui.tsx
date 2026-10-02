import Link from "next/link";
import { CATEGORIES, SITE } from "@/lib/config";
import { cover } from "@/lib/cover";
import { ago, fmtDate, fmtNum, fmtTime } from "@/lib/format";
import type { Article, Interview, Video } from "@/lib/types";

/* ---------- iconos ---------- */
export const P = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M7 4l13 8-13 8Z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4M12 8h.01",
  copy: "M8 8h12v12H8ZM16 8V4H4v12h4",
  bell: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  x: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M10 17h10"
};
export function Icon({ d, w = 2, size, fill }: { d: string; w?: number; size?: number; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
export const SocialIcon = {
  youtube: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1Z" /></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8V6.1c0-.9.6-1.1 1-1.1h2.6V1h-3.6C10.1 1 9.3 3.9 9.3 5.8V8H7v4h2.3v11H14V12h3.2l.4-4Z" /></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.4v13.4a3 3 0 1 1-3-3c.3 0 .6 0 .9.1V9a6.4 6.4 0 1 0 5.5 6.4V8.6a8 8 0 0 0 4.7 1.5V6.7a4.7 4.7 0 0 1-4.7-4.7Z" /></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.3h7l4.8 6.4Zm-1.2 18h1.9L7.1 4.2h-2Z" /></svg>
};
export const SOCIAL_META: Record<keyof typeof SITE.social, { name: string; sub: string }> = {
  youtube: { name: "YouTube", sub: "Videos y en vivo" },
  facebook: { name: "Facebook", sub: "Comunidad y debate" },
  instagram: { name: "Instagram", sub: "Fotos e historias" },
  tiktok: { name: "TikTok", sub: "Clips rápidos" },
  whatsapp: { name: "WhatsApp", sub: "Envíanos tu denuncia" }
};

/* ---------- piezas ---------- */
export const DemoChip = () => <span className="chip demo">Demo</span>;
export function CatChip({ a }: { a: Article }) { return <span className="chip">{CATEGORIES[a.category].name}</span>; }
export function TypeChip({ a }: { a: Article }) {
  if (a.type === "opinion" && a.category !== "opinion") return <span className="chip op">Opinión</span>;
  if (a.type === "denuncia" && a.category !== "denuncias") return <span className="chip den">Denuncia</span>;
  if (a.type === "declaracion") return <span className="chip dec">Declaración</span>;
  return null;
}
export function Meta({ iso }: { iso: string }) {
  return <div className="meta"><b>{fmtDate(iso)}</b><span>{fmtTime(iso)}</span><span>{ago(iso)}</span></div>;
}
export function Cover({ a, w, h, priority }: { a: Article; w: number; h: number; priority?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={a.coverUrl || cover("n" + a.id, a.category, w, h)} alt={a.coverUrl ? a.title : ""} loading={priority ? "eager" : "lazy"} decoding="async" width={w} height={h} />;
}
export function SectionHead({ title, sub, live, children, id }: { title: string; sub?: string; live?: boolean; children?: React.ReactNode; id?: string }) {
  return (
    <div className="sec-head">
      <div>
        <h2 className="sec-title" id={id}><span className={"mark" + (live ? " live" : "")} aria-hidden="true" />{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {children}
    </div>
  );
}
const ReadMore = ({ a }: { a: Article }) => (
  <Link className="read-more" href={`/noticias/${a.slug}`} aria-label={`Leer más: ${a.title}`}>Leer más <Icon d={P.arrow} w={2.4} size={16} /></Link>
);

export function NewsCard({ a }: { a: Article }) {
  return (
    <article className="card stretch rv">
      <div className="cover"><Cover a={a} w={640} h={360} /><div className="chips"><CatChip a={a} /><TypeChip a={a} /></div>{a.isDemo && <span className="demo-flag"><DemoChip /></span>}</div>
      <div className="card-body">
        <h3><Link className="hit" href={`/noticias/${a.slug}`}>{a.title}</Link></h3>
        <p>{a.summary}</p>
        <div className="foot"><Meta iso={a.publishedAt} /><ReadMore a={a} /></div>
      </div>
    </article>
  );
}
export function LeadCard({ a }: { a: Article }) {
  return (
    <article className="lead stretch rv">
      <div className="cover"><Cover a={a} w={800} h={520} /><div className="chips"><CatChip a={a} /><TypeChip a={a} /></div>{a.isDemo && <span className="demo-flag"><DemoChip /></span>}</div>
      <div className="lead-body"><h3><Link className="hit" href={`/noticias/${a.slug}`}>{a.title}</Link></h3><p>{a.summary}</p><Meta iso={a.publishedAt} /><ReadMore a={a} /></div>
    </article>
  );
}
export function RowCard({ a }: { a: Article }) {
  return (
    <article className="row stretch rv">
      <div className="cover"><Cover a={a} w={320} h={220} /></div>
      <div className="row-body">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><CatChip a={a} /><TypeChip a={a} />{a.isDemo && <DemoChip />}</div>
        <h3><Link className="hit" href={`/noticias/${a.slug}`}>{a.title}</Link></h3><Meta iso={a.publishedAt} />
      </div>
    </article>
  );
}
export function VideoCard({ v, compact }: { v: Video; compact?: boolean }) {
  const img = v.thumbnail || cover("v" + v.id, "entrevistas", 640, 360);
  return (
    <article className="vid rv">
      <a className="cover" href={v.url} target="_blank" rel="noopener" aria-label={`Ver en YouTube: ${v.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" loading="lazy" width={640} height={360} />
        {v.duration && <span className="dur">{v.duration}</span>}
        {v.isDemo && <span style={{ position: "absolute", left: 10, top: 10 }}><DemoChip /></span>}
        <span className="pl"><span><Icon d={P.play} fill /></span></span>
      </a>
      <h3>{v.title}</h3>
      <div className="meta"><b>{fmtDate(v.publishedAt)}</b>{v.views != null && <span>{fmtNum(v.views)} vistas</span>}{v.duration && <span>{v.duration}</span>}</div>
      {!compact && <a className="yt-btn" href={v.url} target="_blank" rel="noopener">▶ Ver en YouTube</a>}
    </article>
  );
}
export function InterviewCard({ it }: { it: Interview }) {
  const href = it.articleSlug ? `/noticias/${it.articleSlug}` : it.youtubeId ? `https://www.youtube.com/watch?v=${it.youtubeId}` : SITE.social.youtube;
  return (
    <article className="int rv">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="cover"><img src={cover("i" + it.id, "entrevistas", 400, 500, { portrait: 1 })} alt="" loading="lazy" />{it.isDemo && <span style={{ position: "absolute", top: 10, right: 10 }}><DemoChip /></span>}</div>
      <div className="int-body">
        <span className="meta"><b>{fmtDate(it.publishedAt)}</b></span>
        <h3>{it.name}</h3><p>{it.role} · {it.topic}</p>
        <a className="yt-btn" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>Ver entrevista</a>
      </div>
    </article>
  );
}
export function Empty({ title, text }: { title: string; text: string }) {
  return <div className="empty"><b>{title}</b><span>{text}</span><Link className="btn btn-metal btn-sm" href="/">Volver al inicio</Link></div>;
}
