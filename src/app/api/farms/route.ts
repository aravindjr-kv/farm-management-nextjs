import { fetchFarms } from "@/api/farm";
import { NextResponse } from "next/server";

export async function GET() {
  const farms = await fetchFarms();
  return NextResponse.json({ farms });
}
