import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const data = {
    name: String(b.name || "").slice(0, 120).trim(),
    contact: String(b.contact || "").slice(0, 160).trim(),
    kind: String(b.kind || "Otro").slice(0, 60),
    message: String(b.message || "").slice(0, 4000).trim()
  };
  if (!data.name || !data.contact || !data.message)
    return NextResponse.json({ ok: false, error: "Completa nombre, contacto y mensaje." }, { status: 400 });
  const prisma = db();
  if (prisma) await prisma.contactMessage.create({ data });
  else console.log("[contacto] (sin base de datos)", data);
  return NextResponse.json({ ok: true });
}
