import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

export default function FarmsStatsSkeleton() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card className="@container/card" key={index}>
          <CardHeader>
            <CardDescription>
              <Skeleton className="h-5 w-24" />
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Skeleton className="h-9 w-12" />
            </CardTitle>
            <CardAction>
              <Skeleton />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              <Skeleton className="h-5 w-24" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
