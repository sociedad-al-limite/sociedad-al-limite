import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/config";
import { getBySection, getInterviews } from "@/lib/data/news";
import type { CategorySlug } from "@/lib/types";
import { Empty, InterviewCard, NewsCard } from "@/components/ui";

export const revalidate = 300;
type Props = { params: Promise<{ cat: string }> };

export function generateStaticParams() { return Object.keys(CATEGORIES).map((cat) => ({ cat })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CATEGORIES[(await params).cat as CategorySlug];
  return c ? { title: c.name, description: `${c.desc} Sociedad al Límite: las cosas como son.`, alternates: { canonical: `/seccion/${(await params).cat}` } } : {};
}

export default async function Section({ params }: Props) {
  const slug = (await params).cat as CategorySlug;
  const c = CATEGORIES[slug];
  if (!c) notFound();
  const list = await getBySection(slug);
  const ints = slug === "entrevistas" ? await getInterviews() : [];
  return (
    <>
      <div className="page-hero"><div className="wrap"><nav className="crumbs"><Link href="/">Inicio</Link><span>›</span><span>{c.name}</span></nav><h1 style={{ marginTop: 14 }}>{c.name}</h1><p>{c.desc}</p></div></div>
      <section className="sec wrap">
        {list.length ? <div className="grid">{list.map((a) => <NewsCard key={a.slug} a={a} />)}</div> : <Empty title="Todavía no hay publicaciones en esta sección" text="Cuando la redacción publique, aparecerán aquí." />}
        {ints.length > 0 && <><h2 className="art-h" style={{ marginTop: 48 }}>Todas las entrevistas</h2><div className="ints">{ints.map((it) => <InterviewCard key={it.id} it={it} />)}</div></>}
      </section>
    </>
  );
}
