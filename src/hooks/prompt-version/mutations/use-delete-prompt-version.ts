import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePromptVersionAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function useDeletePromptVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePromptVersionAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: promptVersionKeys.lists(),
      });
    },
  });
}
