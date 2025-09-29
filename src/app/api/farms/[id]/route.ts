import { fetchFarmById } from "@/api/farm";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const farm = await fetchFarmById(params.id);
  return NextResponse.json({ farm });
}
