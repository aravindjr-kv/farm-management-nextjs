import { Suspense } from "react";

import FarmDetails from "./components/FarmDetails";
import CropsTableWrapper from "./components/FarmCrops";
import FarmDetailsSkeleton from "@/app/farms/[id]/components/FarmDetails/Skeleton";
import { CropsTableSkeleton } from "@/app/farms/[id]/components/FarmCrops/Skeleton";

export const revalidate = 30;

export default async function FarmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: farmId } = await params;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
        <Suspense fallback={<FarmDetailsSkeleton />}>
          <FarmDetails farmId={farmId} />
        </Suspense>
        <Suspense fallback={<CropsTableSkeleton />}>
          <CropsTableWrapper id={farmId} />
        </Suspense>
      </div>
    </div>
  );
}
