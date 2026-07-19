import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePromptVersionAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function useDeletePromptVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePromptVersionAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: promptVersionKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: promptVersionKeys.detail(id),
      });

      queryClient.removeQueries({
        queryKey: promptVersionKeys.detailView(id),
      });
    },
  });
}
