import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePromptGroupAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function useUpdatePromptGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; name?: string; description?: string }) =>
      updatePromptGroupAction(data.id, {
        name: data.name,
        description: data.description,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: promptGroupKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: promptGroupKeys.detail(variables.id),
      });
    },
  });
}
