import { NextResponse } from "next/server";
import { fetchCropsByFarmId } from "@/api/farm";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { crops } = await fetchCropsByFarmId(params.id);
  return NextResponse.json({ crops });
}
