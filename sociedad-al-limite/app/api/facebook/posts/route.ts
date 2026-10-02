import { NextResponse } from "next/server";
import { getFacebookPosts } from "@/lib/integrations/facebook";

export const revalidate = 900;
export async function GET() {
  return NextResponse.json(await getFacebookPosts(6));
}
