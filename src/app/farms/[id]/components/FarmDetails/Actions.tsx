"use client";

import { startTransition, useActionState } from "react";
import { IconReload, IconArrowLeft } from "@tabler/icons-react";

import { revalidateFarmDetails } from "@/app/farms/[id]/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Actions({ farmId }: { farmId: string }) {
  const [, dispatch, isPending] = useActionState(revalidateFarmDetails, null);
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Link href="/dashboard" className="flex items-center gap-1 hover:underline">
          <IconArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          startTransition(() => {
            const formData = new FormData();
            formData.append("id", farmId);
            dispatch(formData);
          });
        }}
        disabled={isPending}
      >
        <IconReload className={cn("h-4 w-4", isPending && "animate-spin")} />
      </Button>
    </div>
  );
}
