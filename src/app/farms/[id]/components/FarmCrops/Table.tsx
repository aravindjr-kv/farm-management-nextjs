import { z } from "zod";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export const cropSchema = z.object({
  id: z.string(),
  farm_id: z.string(),
  crop_name: z.string(),
  season: z.enum(["Spring", "Summer", "Fall", "Winter"]),
  area_planted: z.number(),
  expected_yield: z.number(),
  actual_yield: z.number(),
  price_per_kg: z.number(),
  status: z.enum(["harvested", "in progress", "planted", "germinating"]),
  planting_date: z.string(),
  harvest_date: z.string().optional(),
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "harvested":
      return "bg-green-100 text-green-800 border-green-200";
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planted":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "germinating":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getSeasonColor = (season: string) => {
  switch (season) {
    case "Spring":
      return "bg-green-50 text-green-700 border-green-200";
    case "Summer":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Fall":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Winter":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function CropsTable({
  data,
}: {
  data: z.infer<typeof cropSchema>[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Crop Name</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Area (acres)</TableHead>
              <TableHead className="text-right">Expected Yield (kg)</TableHead>
              <TableHead className="text-right">Actual Yield (kg)</TableHead>
              <TableHead className="text-right">Price/kg (GBP)</TableHead>
              <TableHead>Planting Date</TableHead>
              <TableHead>Harvest Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length ? (
              data.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">
                    {crop.crop_name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getSeasonColor(crop.season)} text-xs`}
                    >
                      {crop.season}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(crop.status)} text-xs`}
                    >
                      {crop.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(crop.area_planted)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(crop.expected_yield)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {crop.actual_yield > 0
                      ? formatNumber(crop.actual_yield)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(crop.price_per_kg)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(crop.planting_date)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {crop.harvest_date ? formatDate(crop.harvest_date) : "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No crops found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { CropsTableSkeleton } from "./Skeleton";
