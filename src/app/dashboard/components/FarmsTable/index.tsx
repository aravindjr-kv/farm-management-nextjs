import FarmsTable from "@/app/dashboard/components/FarmsTable/FarmsTable";
import { getApiUrl } from "@/lib/utils";
import { Farm } from "@/mock";

export default async function FarmsTableWrapper() {
  const response = await fetch(getApiUrl("farms"), {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch farms: ${response.status}`);
  }

  const data: { farms: Farm[] } = await response.json();
  const farms = data.farms;

  return <FarmsTable data={farms} />;
}

export { default as FarmsTableSkeleton } from "./Skeleton";
