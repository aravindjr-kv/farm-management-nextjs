import { fetchDashboardMetrics } from "@/api/farm";
import { NextResponse } from "next/server";

export async function GET() {
  const stats = await fetchDashboardMetrics();

  return NextResponse.json({ stats });
}
