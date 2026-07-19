import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePromptGroupAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function useDeletePromptGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePromptGroupAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: promptGroupKeys.lists(),
      });
    },
  });
}
