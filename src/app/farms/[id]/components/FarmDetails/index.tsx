import { notFound } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import {
  IconMapPin,
  IconUser,
  IconCalendar,
  IconAward,
  IconPlant,
  IconChartArea,
  IconGrowth,
  IconCurrencyPound,
} from "@tabler/icons-react";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  getApiUrl,
  getInitials,
} from "@/lib/utils";
import { FarmWithTopCrop } from "@/mock";
import Actions from "@/app/farms/[id]/components/FarmDetails/Actions";

interface FarmDetailsProps {
  farmId: string;
}

export default async function FarmDetails({ farmId }: FarmDetailsProps) {
  const response = await fetch(getApiUrl(`farms/${farmId}`), {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch farm: ${response.status}`);
  }

  const data: { farm: FarmWithTopCrop } = await response.json();

  const farm = data.farm;

  if (!farm) {
    return notFound();
  }

  const farmStats = [
    {
      label: "Total Acreage",
      description: "Total farm acreage",
      value: `${formatNumber(farm.total_acreage)} acres`,
      icon: <IconChartArea />,
    },
    {
      label: "Annual Yield",
      description: "Total annual yield",
      value: `${formatNumber(farm.annual_yield)} kg`,
      icon: <IconGrowth />,
    },
    {
      label: "Total Revenue",
      description: "Total farm revenue",
      value: formatCurrency(farm.total_revenue),
      icon: <IconCurrencyPound />,
    },
    {
      label: "Established",
      description: "Farm establishment date",
      value: formatDate(farm.established_date),
      icon: <IconCalendar />,
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-4">
      <Actions farmId={farmId} />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Farm Header Card */}
        <Card className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {getInitials(farm.farm_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <CardTitle className="text-2xl">{farm.farm_name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconMapPin className="h-4 w-4" />
                  <span className="font-medium">{farm.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IconUser className="h-4 w-4" />
                  <span>Owner: {farm.owner}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Farm Stats Grid */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {farmStats.map((stat) => (
            <Card className="@container/card" key={stat.label}>
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {stat.value}
                </CardTitle>
                <CardAction>{stat.icon}</CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {stat.description}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Active Crops and Certifications Grid */}
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
          {/* Active Crops */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconPlant className="h-5 w-5" />
                Active Crops
              </CardTitle>
              <CardDescription>
                Currently growing crops on this farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {farm.active_crops.map((crop, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconAward className="h-5 w-5" />
                Top Crop
              </CardTitle>
              <CardDescription>
                The crop with the highest actual yield
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">
                  {farm.topCrop.crop_name}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconAward className="h-5 w-5" />
                Certifications
              </CardTitle>
              <CardDescription>
                Farm quality and compliance certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {farm.certifications.map((certification, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <div className="p-1 bg-primary/10 rounded-full">
                      <IconAward className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{certification}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
