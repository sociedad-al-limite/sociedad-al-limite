import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/data/news";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.slice(0, 120) ?? "";
  const results = await searchArticles(q);
  return NextResponse.json({ q, results: results.slice(0, 30) });
}
