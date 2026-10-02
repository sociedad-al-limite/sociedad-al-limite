import Link from "next/link";
import { CATEGORIES, PRIORITY_PLACES, SITE } from "@/lib/config";
import { cover, CATS } from "@/lib/cover";
import { getAllArticles, getByPlace, getFeatured, getInterviews, getMostRead, inSection } from "@/lib/data/news";
import { DEMO_GALLERY, DEMO_PODCAST } from "@/lib/data/demo";
import { getFacebookPosts } from "@/lib/integrations/facebook";
import { getLatestVideos } from "@/lib/integrations/youtube";
import { ago, fmtDate, fmtNum, hoursAgo } from "@/lib/format";
import type { CategorySlug } from "@/lib/types";
import { AlertButton, ContactForm, Gallery, HeroFx, LiveBox, LocalTabs, PodcastList, SearchBox } from "@/components/client";
import { CatChip, Cover, DemoChip, Icon, InterviewCard, LeadCard, Meta, NewsCard, P, SectionHead, SocialIcon, SOCIAL_META, VideoCard } from "@/components/ui";

export const revalidate = 300;

const CAT_BG: Record<string, string> = {
  politica: "linear-gradient(150deg,#3a0906,#0f0f12 70%)", sociedad: "linear-gradient(150deg,#26272c,#0f0f12 70%)",
  local: "radial-gradient(120% 90% at 100% 0%,#5e0d08,#0f0f12 65%)", educacion: "linear-gradient(200deg,#2c2e33,#0f0f12 60%)",
  religion: "radial-gradient(90% 90% at 80% 10%,#3b3d43,#0f0f12 70%)", entrevistas: "linear-gradient(150deg,#7a0e09,#1a0605 60%)",
  opinion: "linear-gradient(160deg,#1d1d22,#0f0f12)", denuncias: "repeating-linear-gradient(135deg,rgba(227,38,27,.16) 0 10px,transparent 10px 22px),linear-gradient(150deg,#3a0906,#0f0f12 70%)"
};

export default async function Home() {
  const [all, f, most, interviews, videos, posts] = await Promise.all([getAllArticles(), getFeatured(), getMostRead(), getInterviews(), getLatestVideos(4), getFacebookPosts(3)]);
  const rest = all.filter((a) => a.slug !== f.slug);
  const lead = rest.find((a) => a.priority === 3) ?? rest[0];
  const grid = rest.filter((a) => a.slug !== lead?.slug).slice(0, 6);
  const local = Object.fromEntries(await Promise.all(PRIORITY_PLACES.map(async (p) => [p, await getByPlace(p)] as const)));

  return (
    <>
      <section className="hero" aria-label="Portada">
        <HeroFx />
        <div className="wrap hero-in">
          <div>
            <div className="hero-kicker">Medio digital · República Dominicana</div>
            <h1><span className="m">Sociedad</span><span className="r">al Límite</span></h1>
            <div className="hero-slogan">Las cosas como son</div>
            <p className="lede">Noticias, análisis, entrevistas y las historias que están dando de qué hablar.</p>
            <div className="hero-cta">
              <Link className="btn btn-red" href="#ultimas">Ver últimas noticias <Icon d={P.arrow} w={2.4} /></Link>
              <a className="btn btn-metal" href={SITE.social.youtube} target="_blank" rel="noopener">{SocialIcon.youtube} Ver en YouTube</a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="hero-logo"><img src="/logo.webp" alt="Logo de Sociedad al Límite" width={460} height={315} fetchPriority="high" /></div>
        </div>
        <div className="wrap search-band">
          <SearchBox id="homeSearch" />
          <div className="search-chips"><span>Búsquedas frecuentes:</span>
            {["Consuelo", "San Pedro de Macorís", "Lluvias", "Agua", "Entrevistas"].map((q) => <Link key={q} className="qchip" href={`/buscar?q=${encodeURIComponent(q)}`}>{q}</Link>)}
          </div>
        </div>
      </section>

      <section className="sec wrap" aria-labelledby="h-feat">
        <SectionHead id="h-feat" title="Noticia del momento" live />
        <article className="feat stretch rv">
          <div className="cover"><Cover a={f} w={900} h={620} priority /><div className="chips"><CatChip a={f} /></div>{f.isDemo && <span className="demo-flag"><DemoChip /></span>}</div>
          <div className="feat-body">
            <div className="feat-flash">ÚLTIMA HORA {f.developing && <span className="chip dev"><i /> En desarrollo</span>}</div>
            <h3><Link className="hit" href={`/noticias/${f.slug}`}>{f.title}</Link></h3>
            <p>{f.summary}</p>
            <Meta iso={f.publishedAt} />
            <div><Link className="btn btn-red z2" href={`/noticias/${f.slug}`}>Leer noticia completa <Icon d={P.arrow} w={2.4} /></Link></div>
          </div>
        </article>
      </section>

      <section className="sec wrap" id="ultimas" aria-labelledby="h-latest">
        <SectionHead id="h-latest" title="Últimas noticias" sub="Lo más reciente publicado por la redacción.">
          <Link className="sec-link" href="/buscar">Ver todas <Icon d={P.arrow} w={2.4} size={16} /></Link>
        </SectionHead>
        <div className="news-layout">
          <div className="news-main">{lead && <LeadCard a={lead} />}<div className="grid">{grid.map((a) => <NewsCard key={a.slug} a={a} />)}</div></div>
          <aside className="aside">
            <div className="panel rv">
              <div className="panel-title"><span className="sec-title" style={{ fontSize: "inherit", gap: 10 }}><span className="mark" aria-hidden="true" />Más leídas</span></div>
              <ol className="rank">{most.map((a) => <li key={a.slug}><Link href={`/noticias/${a.slug}`}><span><strong>{a.title}</strong><small>{fmtNum(a.views)} lecturas · {CATEGORIES[a.category].name}</small></span></Link></li>)}</ol>
            </div>
            <div className="panel alert-panel rv">
              <div className="panel-title"><span style={{ color: "var(--red-hot)", display: "inline-flex" }}><Icon d={P.bell} size={24} /></span> Alertas</div>
              <p>Recibe una notificación cuando publiquemos noticias de última hora.</p>
              <AlertButton />
            </div>
          </aside>
        </div>
      </section>

      <section className="sec wrap" aria-labelledby="h-cats">
        <SectionHead id="h-cats" title="Secciones" sub="Explora la cobertura por tema." />
        <div className="cats">
          {(["politica", "sociedad", "local", "educacion", "religion", "entrevistas", "opinion", "denuncias"] as CategorySlug[]).map((k) => (
            <Link key={k} className="cat rv" href={`/seccion/${k}`} style={{ ["--cbg" as string]: CAT_BG[k] }}>
              <svg className="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={CATS[k].glyph} /></svg>
              <span className="count">{all.filter((a) => inSection(a, k)).length} publicaciones</span>
              <h3>{CATEGORIES[k].name}</h3><p>{CATEGORIES[k].desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec wrap" id="locales" aria-labelledby="h-local">
        <SectionHead id="h-local" title="Noticias locales" sub="Consuelo y San Pedro de Macorís primero. Pronto, más comunidades." />
        <LocalTabs groups={local} />
      </section>

      <section className="sec wrap" id="videos" aria-labelledby="h-yt">
        <SectionHead id="h-yt" title="Sociedad al Límite en YouTube" sub="Últimos videos del canal y transmisión en vivo.">
          <a className="sec-link" href={SITE.social.youtube} target="_blank" rel="noopener">Ir al canal <Icon d={P.arrow} w={2.4} size={16} /></a>
        </SectionHead>
        <div className="yt-layout"><LiveBox /><div className="vids">{videos.map((v) => <VideoCard key={v.id} v={v} />)}</div></div>
        <div className="sub-cta rv"><b>¿No quieres perderte nada?</b><a className="btn btn-red" href={SITE.social.youtube} target="_blank" rel="noopener">{SocialIcon.youtube} Suscríbete al canal</a></div>
      </section>

      <section className="sec wrap" id="entrevistas" aria-labelledby="h-int">
        <SectionHead id="h-int" title="Entrevistas" sub="Conversaciones exclusivas con las voces de nuestras comunidades.">
          <Link className="sec-link" href="/seccion/entrevistas">Ver todas <Icon d={P.arrow} w={2.4} size={16} /></Link>
        </SectionHead>
        <div className="ints">{interviews.slice(0, 4).map((it) => <InterviewCard key={it.id} it={it} />)}</div>
      </section>

      <div className="sec wrap duo">
        <section id="podcast" aria-labelledby="h-pod">
          <SectionHead id="h-pod" title="Podcast" sub="Episodios para escuchar donde estés." />
          <PodcastList eps={DEMO_PODCAST.map((p) => ({ ep: p.ep, title: p.title, meta: `${fmtDate(hoursAgo(p.h))} · ${p.dur}`, audio: null }))} />
        </section>
        <section id="facebook" aria-labelledby="h-fb">
          <SectionHead id="h-fb" title="Síguenos en Facebook" sub="Publicaciones recientes de nuestra página." />
          <div className="fb-head rv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-sm.webp" alt="" />
            <div><b>Sociedad al Límite</b><small>Página oficial</small></div>
            <a className="btn btn-red btn-sm" href={SITE.social.facebook} target="_blank" rel="noopener">{SocialIcon.facebook} Seguir en Facebook</a>
          </div>
          <div className="fb-posts">{posts.map((p) => (
            <a key={p.id} className="fb-post rv" href={p.url} target="_blank" rel="noopener">
              <div className="meta"><b>Sociedad al Límite</b><span>{ago(p.createdAt)}</span>{p.isDemo && <DemoChip />}</div><p>{p.text}</p>
            </a>))}
          </div>
        </section>
      </div>

      <section className="sec wrap" id="galeria" aria-labelledby="h-gal">
        <SectionHead id="h-gal" title="Galería" sub="Momentos de nuestra cobertura." />
        <Gallery items={DEMO_GALLERY.map((g, i) => ({ src: cover("g" + i, g.cat, i === 0 ? 800 : 480, i === 0 ? 720 : 360), caption: g.cap }))} />
      </section>

      <section className="sec wrap" id="redes" aria-labelledby="h-soc">
        <SectionHead id="h-soc" title="Sociedad al Límite en redes" sub="Las cosas como son, también en tus redes favoritas." />
        <div className="socials">{(Object.keys(SITE.social) as (keyof typeof SITE.social)[]).map((k) => (
          <a key={k} className="soc rv" href={SITE.social[k]} target="_blank" rel="noopener">{SocialIcon[k]}<b>{SOCIAL_META[k].name}</b><small>{SOCIAL_META[k].sub}</small></a>))}
        </div>
      </section>

      <section className="sec wrap" id="contacto" aria-labelledby="h-con">
        <SectionHead id="h-con" title="Contacto" sub="¿Tienes una denuncia, una historia o una propuesta? Escríbenos. Verificamos la información antes de publicarla." />
        <div className="contact">
          <div className="contact-info">
            <div className="ci"><small>Correo de la redacción</small><span style={{ fontWeight: 600, userSelect: "all" }}>{SITE.contactEmail}</span></div>
            <div className="ci"><small>WhatsApp de denuncias</small><div className="ci-row"><span>Escríbenos directamente</span><a className="btn btn-red btn-sm" href={SITE.social.whatsapp} target="_blank" rel="noopener">{SocialIcon.whatsapp} Abrir</a></div></div>
            <div className="ci"><small>Cobertura</small><span style={{ color: "var(--muted)" }}>Consuelo, San Pedro de Macorís y República Dominicana.</span></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
