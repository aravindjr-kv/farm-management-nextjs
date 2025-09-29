import FarmsStatsSkeleton from "./Skeleton";
import { SectionCards } from "@/components/section-cards";
import { getApiUrl } from "@/lib/utils";
import { FarmMetrics } from "@/mock";

export async function FarmsStats() {
  const response = await fetch(getApiUrl("farms/stats"), {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status}`);
  }

  const data: { stats: FarmMetrics } = await response.json();
  const metrics = data.stats;

  return <SectionCards metrics={metrics} />;
}

export { FarmsStatsSkeleton };
