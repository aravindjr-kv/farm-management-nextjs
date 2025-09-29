import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CropsTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Crop Name</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="text-right">Area (acres)</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Expected Yield (kg)</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Actual Yield (kg)</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Price/kg ($)</div>
              </TableHead>
              <TableHead>Planting Date</TableHead>
              <TableHead>Harvest Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {/* Crop Name */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                {/* Season Badge */}
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                {/* Status Badge */}
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                {/* Area (right aligned) */}
                <TableCell>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </TableCell>
                {/* Expected Yield (right aligned) */}
                <TableCell>
                  <div className="text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                </TableCell>
                {/* Actual Yield (right aligned) */}
                <TableCell>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </TableCell>
                {/* Price/kg (right aligned) */}
                <TableCell>
                  <div className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </TableCell>
                {/* Planting Date */}
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                {/* Harvest Date */}
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                {/* Actions Menu */}
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
