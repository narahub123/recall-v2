"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createPromptGroupAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function useCreatePromptGroup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      createPromptGroupAction(data),

    onSuccess: (promptGroup) => {
      queryClient.invalidateQueries({
        queryKey: promptGroupKeys.lists(),
      });

      router.push(`/admin/prompts/${promptGroup.id}`);
    },
  });
}
