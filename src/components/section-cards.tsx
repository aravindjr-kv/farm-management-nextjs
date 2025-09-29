import {
  IconBuildingCottage,
  IconGrowth,
  IconRectangle,
  IconChartArea,
} from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FarmMetrics } from "@/mock";
import { formatNumber } from "@/lib/utils";

export function SectionCards({ metrics }: { metrics: FarmMetrics }) {
  const formattedMetrics = [
    {
      label: "Total Farms",
      description: "Total number of farms",
      value: formatNumber(metrics.totalFarms),
      icon: <IconBuildingCottage />,
    },
    {
      label: "Total Acreage",
      description: "Total acreage of all farms",
      value: `${formatNumber(metrics.totalAcreage)} acres`,
      icon: <IconChartArea />,
    },
    {
      label: "Total Annual Yield",
      description: "Total annual yield of all farms",
      value: `${formatNumber(metrics.totalAnnualYield)} kg`,
      icon: <IconGrowth />,
    },
    {
      label: "Average Yield Per Acre",
      description: "Average yield per acre of all farms",
      value: `${formatNumber(metrics.averageYieldPerAcre)} kg/acre`,
      icon: (
        <div className="relative">
          <IconRectangle />
          <IconGrowth
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            size={12}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {formattedMetrics.map((metric) => (
        <Card className="@container/card" key={metric.label}>
          <CardHeader>
            <CardDescription>{metric.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metric.value}
            </CardTitle>
            <CardAction>{metric.icon}</CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {metric.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
