import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getInterviews, searchArticles, terms } from "@/lib/data/news";
import { getLatestVideos } from "@/lib/integrations/youtube";
import { norm } from "@/lib/format";
import { SearchBox } from "@/components/client";
import { Empty, InterviewCard, NewsCard, VideoCard } from "@/components/ui";

export const metadata: Metadata = { title: "Buscar", robots: { index: false } };
type Props = { searchParams: Promise<{ q?: string; tipo?: string }> };

export default async function Search({ searchParams }: Props) {
  const { q = "", tipo = "todo" } = await searchParams;
  const ts = terms(q);
  const match = (s: string) => ts.length > 0 && ts.filter((t) => norm(s).includes(t)).length >= Math.max(1, Math.ceil(ts.length * 0.6));
  const [news, videos, ints] = q
    ? await Promise.all([searchArticles(q), getLatestVideos(12).then((v) => v.filter((x) => match(x.title))), getInterviews().then((i) => i.filter((x) => match(`${x.name} ${x.role} ${x.topic}`)))])
    : [await getAllArticles(), [], []];
  const total = news.length + videos.length + ints.length;
  const tabs: [string, string, number][] = [["todo", "Todo", total], ["noticias", "Noticias", news.length], ["videos", "Videos", videos.length], ["entrevistas", "Entrevistas", ints.length]];
  const show = (k: string) => tipo === "todo" || tipo === k;
  return (
    <>
      <div className="page-hero"><div className="wrap">
        <nav className="crumbs"><Link href="/">Inicio</Link><span>›</span><span>Buscar</span></nav>
        <h1 style={{ margin: "14px 0 18px" }}>{q ? "Resultados" : "Todas las noticias"}</h1>
        <SearchBox initial={q} id="pageSearch" />
        {q && <div className="filters">{tabs.map(([k, l, c]) => <Link key={k} className="tab" aria-selected={tipo === k} href={`/buscar?q=${encodeURIComponent(q)}&tipo=${k}`} style={{ display: "inline-flex", alignItems: "center" }}>{l} ({c})</Link>)}</div>}
      </div></div>
      <section className="sec wrap">
        {q && <p className="sec-sub" style={{ margin: "0 0 20px" }}>{total} resultado{total === 1 ? "" : "s"} para “<b style={{ color: "#fff" }}>{q}</b>”</p>}
        {q && total === 0 && <Empty title="Sin resultados" text={`No encontramos publicaciones sobre “${q}”. Prueba con otro lugar, persona o tema.`} />}
        {show("noticias") && news.length > 0 && <div className="grid" style={{ marginBottom: 40 }}>{news.map((a) => <NewsCard key={a.slug} a={a} />)}</div>}
        {show("videos") && videos.length > 0 && <><h2 className="art-h">Videos</h2><div className="grid" style={{ marginBottom: 40 }}>{videos.map((v) => <VideoCard key={v.id} v={v} />)}</div></>}
        {show("entrevistas") && ints.length > 0 && <><h2 className="art-h">Entrevistas</h2><div className="ints">{ints.map((it) => <InterviewCard key={it.id} it={it} />)}</div></>}
      </section>
    </>
  );
}
