import { NextResponse } from "next/server";
import { llmAnswer, llmConfigured } from "@/lib/saul/llm";
import { rulesAnswer } from "@/lib/saul/rules";

export const dynamic = "force-dynamic";

// Límite simple por IP (en memoria). En producción con varias instancias,
// sustituir por Upstash Redis o similar.
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now(); const h = hits.get(ip);
  if (!h || now - h.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n++; return h.n > 20; // 20 preguntas por minuto
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Demasiadas preguntas seguidas. Espera un momento." }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const message = String(body.message || "").slice(0, 500).trim();
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
  if (!message) return NextResponse.json({ error: "Escribe una pregunta." }, { status: 400 });

  try {
    const reply = llmConfigured() ? await llmAnswer(message, history) : await rulesAnswer(message);
    return NextResponse.json(reply);
  } catch (e) {
    console.error("[saul] IA no disponible, uso reglas:", e);
    return NextResponse.json(await rulesAnswer(message));
  }
}
