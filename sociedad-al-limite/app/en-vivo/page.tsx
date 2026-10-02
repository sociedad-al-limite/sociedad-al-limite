import type { Metadata } from "next";
import Link from "next/link";
import { getLatestVideos } from "@/lib/integrations/youtube";
import { LiveBox, LiveChat } from "@/components/client";
import { SectionHead, VideoCard } from "@/components/ui";

export const metadata: Metadata = { title: "En vivo", description: "Transmisiones en vivo de Sociedad al Límite por YouTube.", alternates: { canonical: "/en-vivo" } };
export const revalidate = 120;

export default async function Live() {
  const videos = await getLatestVideos(3);
  return (
    <>
      <div className="page-hero"><div className="wrap">
        <nav className="crumbs"><Link href="/">Inicio</Link><span>›</span><span>En vivo</span></nav>
        <h1 style={{ marginTop: 14 }}>Sociedad al Límite en vivo</h1>
        <p>Programas, debates y coberturas especiales en directo por YouTube.</p>
      </div></div>
      <div className="wrap live-page"><LiveBox full /><LiveChat /></div>
      <section className="sec wrap" style={{ paddingTop: 20 }}><SectionHead title="Transmisiones anteriores" /><div className="grid">{videos.map((v) => <VideoCard key={v.id} v={v} />)}</div></section>
    </>
  );
}
