import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPromptVersionAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function useCreatePromptVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { promptGroupId: string; content: string }) =>
      createPromptVersionAction(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: promptVersionKeys.list(variables.promptGroupId),
      });
    },
  });
}
