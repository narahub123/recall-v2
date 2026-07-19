import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPromptGroupAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function useCreatePromptGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      createPromptGroupAction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: promptGroupKeys.lists(),
      });
    },
  });
}
