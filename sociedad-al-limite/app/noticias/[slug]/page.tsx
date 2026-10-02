import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SITE } from "@/lib/config";
import { cover } from "@/lib/cover";
import { getAllArticles, getArticle, getRelated } from "@/lib/data/news";
import { getLatestVideos } from "@/lib/integrations/youtube";
import { fmtDate, fmtTime } from "@/lib/format";
import { LiteYouTube, ShareButtons } from "@/components/client";
import { Lion } from "@/components/Lion";
import { CatChip, Cover, DemoChip, Icon, NewsCard, P, SectionHead, TypeChip, VideoCard } from "@/components/ui";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllArticles()).slice(0, 50).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle((await params).slug);
  if (!a) return {};
  const img = a.coverUrl || "/og-image.jpg";
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/noticias/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.summary, publishedTime: a.publishedAt, section: CATEGORIES[a.category].name, tags: a.tags, images: [img] },
    twitter: { card: "summary_large_image", title: a.title, description: a.summary, images: [img] },
    robots: a.isDemo ? { index: false } : undefined // la demo no se indexa en Google
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = await getArticle((await params).slug);
  if (!a) notFound();
  const [related, videos] = await Promise.all([getRelated(a), getLatestVideos(4)]);
  const words = a.body.map((b) => (typeof b === "string" ? b : b.quote)).join(" ").split(/\s+/).length;
  const notice =
    a.type === "denuncia" ? "Denuncia ciudadana: la información fue aportada por residentes y no ha sido confirmada de forma independiente. Sociedad al Límite solicitó la versión de las partes."
    : a.type === "opinion" ? "Artículo de opinión: refleja el punto de vista de su autor."
    : a.type === "declaracion" ? "Esta nota recoge declaraciones atribuidas a su fuente. Las afirmaciones no han sido verificadas por la redacción." : "";
  const ld = {
    "@context": "https://schema.org", "@type": "NewsArticle", headline: a.title, description: a.summary,
    image: [a.coverUrl ? a.coverUrl : `${SITE.url}/og-image.jpg`], datePublished: a.publishedAt, dateModified: a.publishedAt,
    author: [{ "@type": "Person", name: a.author }], articleSection: CATEGORIES[a.category].name, keywords: a.tags.join(", "),
    mainEntityOfPage: `${SITE.url}/noticias/${a.slug}`,
    publisher: { "@type": "NewsMediaOrganization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/logo.webp` } }
  };
  const vid = videos[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap"><nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span><Link href={`/seccion/${a.category}`}>{CATEGORIES[a.category].name}</Link><span>›</span><span>Noticia</span></nav></div>
      <article className="wrap">
        <div className="art">
          <header className="art-head">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><CatChip a={a} /><TypeChip a={a} />{a.developing && <span className="chip dev"><i /> En desarrollo</span>}{a.isDemo && <DemoChip />}</div>
            <h1>{a.title}</h1>
            {a.subtitle && <p className="sub">{a.subtitle}</p>}
            <div className="byline">
              <div className="author"><span className="av"><Lion size={38} /></span><div><b>{a.author}</b><small><time dateTime={a.publishedAt}>{fmtDate(a.publishedAt)} · {fmtTime(a.publishedAt)}</time> · {Math.max(1, Math.round(words / 200))} min de lectura</small></div></div>
              <ShareButtons path={`/noticias/${a.slug}`} title={a.title} />
            </div>
          </header>
        </div>
        <figure className="art-fig" style={{ marginInline: "auto" }}><div className="cover"><Cover a={a} w={1280} h={640} priority /></div>{!a.coverUrl && <figcaption>Imagen ilustrativa.</figcaption>}</figure>
        <div className="art">
          {(a.isDemo || notice) && <div className="notice"><Icon d={P.info} /><div>{a.isDemo && <><b>Contenido de demostración.</b> Esta noticia es un ejemplo y no describe hechos reales.<br /></>}{notice}</div></div>}
          <div className="art-body">{a.body.map((b, i) => typeof b === "string" ? <p key={i}>{b}</p> : <blockquote key={i}>“{b.quote}”<cite>{b.cite}</cite></blockquote>)}</div>
          <h2 className="art-h">Fotografías</h2>
          <div className="art-photos">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="cover"><img src={cover("p1" + a.id, a.category, 640, 480)} alt="Fotografía ilustrativa" loading="lazy" /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="cover"><img src={cover("p2" + a.id, a.category, 640, 480)} alt="Fotografía ilustrativa" loading="lazy" /></div>
          </div>
          {a.youtubeId
            ? <><h2 className="art-h">Video</h2><LiteYouTube id={a.youtubeId} title={a.title} /></>
            : vid && <><h2 className="art-h">Video relacionado</h2><div className="rel-vid"><VideoCard v={vid} compact /><div style={{ display: "grid", gap: 10 }}><a className="yt-btn" href={vid.url} target="_blank" rel="noopener">▶ Ver en YouTube</a></div></div></>}
          <div className="tags">{[...a.places, ...a.tags].map((t) => <Link key={t} href={`/buscar?q=${encodeURIComponent(t)}`}>#{t}</Link>)}</div>
          <div className="byline" style={{ marginTop: 28 }}><b style={{ fontFamily: "var(--display)", letterSpacing: ".08em", textTransform: "uppercase" }}>Comparte esta noticia</b><ShareButtons path={`/noticias/${a.slug}`} title={a.title} /></div>
        </div>
        <section className="sec" style={{ paddingTop: 40 }}><SectionHead title="También te puede interesar" /><div className="grid">{related.map((r) => <NewsCard key={r.slug} a={r} />)}</div></section>
      </article>
    </>
  );
}
