import CropsTable from "@/app/farms/[id]/components/FarmCrops/Table";
import { getApiUrl } from "@/lib/utils";
import { Crop } from "@/mock";

export default async function CropsTableWrapper({ id }: { id: string }) {
  const response = await fetch(getApiUrl(`farms/${id}/crops`), {
    next: { revalidate: 30 },
  });
  const data: { crops: Crop[] } = await response.json();
  const crops = data.crops;

  return <CropsTable data={crops} />;
}
