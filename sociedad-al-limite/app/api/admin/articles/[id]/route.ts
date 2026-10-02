import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const prisma = db();
  if (!prisma) return NextResponse.json({ error: "Sin base de datos" }, { status: 503 });
  const { id } = await params;
  const b = await req.json();
  const { category, ...rest } = b;
  const data: Record<string, unknown> = { ...rest };
  if (category) {
    const c = await prisma.category.findUnique({ where: { slug: category } });
    if (c) data.categoryId = c.id;
  }
  if (b.status === "PUBLICADO" && !b.publishedAt) data.publishedAt = new Date();
  return NextResponse.json(await prisma.article.update({ where: { id }, data }));
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const prisma = db();
  if (!prisma) return NextResponse.json({ error: "Sin base de datos" }, { status: 503 });
  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
