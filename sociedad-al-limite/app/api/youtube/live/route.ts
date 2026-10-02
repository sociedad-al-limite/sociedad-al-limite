import { NextResponse } from "next/server";
import { getLiveStatus } from "@/lib/integrations/youtube";

export const revalidate = 120;
export async function GET() {
  return NextResponse.json(await getLiveStatus());
}
