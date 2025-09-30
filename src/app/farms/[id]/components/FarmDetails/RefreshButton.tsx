"use client";

import { startTransition, useActionState } from "react";
import { IconRefresh } from "@tabler/icons-react";

import { revalidateFarmDetails } from "@/app/farms/[id]/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RefreshButton({ farmId }: { farmId: string }) {
  const [, dispatch, isPending] = useActionState(revalidateFarmDetails, null);
  return (
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
      <IconRefresh className={cn("h-4 w-4", isPending && "animate-spin")} />
    </Button>
  );
}
