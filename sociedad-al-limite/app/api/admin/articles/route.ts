import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendBreakingNews } from "@/lib/push";
import { SITE } from "@/lib/config";

// Protegido por middleware.ts (usuario y contraseña del panel).

export async function GET() {
  const prisma = db();
  if (!prisma) return NextResponse.json({ error: "Configura DATABASE_URL para administrar noticias." }, { status: 503 });
  const rows = await prisma.article.findMany({ orderBy: { updatedAt: "desc" }, include: { category: true }, take: 200 });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const prisma = db();
  if (!prisma) return NextResponse.json({ error: "Configura DATABASE_URL para administrar noticias." }, { status: 503 });
  const b = await req.json();
  const category = await prisma.category.findUnique({ where: { slug: b.category } });
  if (!category) return NextResponse.json({ error: "Categoría no válida" }, { status: 400 });
  const slug = String(b.slug || b.title).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
  const article = await prisma.article.create({
    data: {
      slug, title: b.title, subtitle: b.subtitle, summary: b.summary, body: b.body,
      coverUrl: b.coverUrl, type: b.type ?? "NOTICIA", verification: b.verification ?? "CONFIRMADO",
      status: b.status ?? "BORRADOR", featured: !!b.featured, developing: !!b.developing, breaking: !!b.breaking,
      priority: b.priority ?? 1, places: b.places ?? [], tags: b.tags ?? [], youtubeId: b.youtubeId,
      publishedAt: b.status === "PUBLICADO" ? new Date() : null, categoryId: category.id
    }
  });
  if (article.status === "PUBLICADO" && article.breaking) await sendBreakingNews(article.title, `${SITE.url}/noticias/${article.slug}`);
  return NextResponse.json(article, { status: 201 });
}
