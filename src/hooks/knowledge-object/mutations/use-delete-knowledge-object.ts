import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteKnowledgeObjectAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useDeleteKnowledgeObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeObjectAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: knowledgeObjectKeys.detail(id),
      });
    },
  });
}
