import type { MetadataRoute } from "next";
import { CATEGORIES, SITE } from "@/lib/config";
import { getAllArticles } from "@/lib/data/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getAllArticles()).filter((a) => !a.isDemo);
  return [
    { url: SITE.url, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE.url}/en-vivo`, changeFrequency: "hourly", priority: 0.8 },
    ...Object.keys(CATEGORIES).map((c) => ({ url: `${SITE.url}/seccion/${c}`, changeFrequency: "hourly" as const, priority: 0.7 })),
    ...articles.map((a) => ({ url: `${SITE.url}/noticias/${a.slug}`, lastModified: a.publishedAt, changeFrequency: "daily" as const, priority: 0.9 }))
  ];
}
