"use client";

import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { UpdateEventTypeStatusAction } from "../actions";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function MenuActiveSwitch({
  initalchecked,
  eventTypeId,
}: {
  initalchecked: boolean;
  eventTypeId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(UpdateEventTypeStatusAction, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initalchecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
    />
  );
}
