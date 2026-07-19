import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePromptVersionAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function useUpdatePromptVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; content: string }) =>
      updatePromptVersionAction(data.id, {
        content: data.content,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: promptVersionKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: promptVersionKeys.detailView(variables.id),
      });
    },
  });
}
