import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CropsTableSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Active Crops</TableHead>
              <TableHead>
                <div className="w-full text-right">Total Acreage</div>
              </TableHead>
              <TableHead>
                <div className="w-full text-right">Annual Yield</div>
              </TableHead>
              {/* <TableHead></TableHead> */}
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
                    <Skeleton className="h-4 w-32" />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
