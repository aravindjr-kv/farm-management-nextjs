import { Suspense } from "react";

import {
  FarmsStats,
  FarmsStatsSkeleton,
} from "@/app/dashboard/components/FarmsStats";
import FarmsTable, { FarmsTableSkeleton } from "./components/FarmsTable";

export const revalidate = 30;

export default async function Page() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
        <Suspense fallback={<FarmsStatsSkeleton />}>
          <FarmsStats />
        </Suspense>
        <Suspense fallback={<FarmsTableSkeleton />}>
          <FarmsTable />
        </Suspense>
      </div>
    </div>
  );
}
