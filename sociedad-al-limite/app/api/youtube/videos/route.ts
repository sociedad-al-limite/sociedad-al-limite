import { NextResponse } from "next/server";
import { getLatestVideos } from "@/lib/integrations/youtube";

export const revalidate = 600;
export async function GET() {
  return NextResponse.json(await getLatestVideos(12));
}
