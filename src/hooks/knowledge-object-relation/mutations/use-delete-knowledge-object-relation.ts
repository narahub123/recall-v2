import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteKnowledgeObjectRelationAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useDeleteKnowledgeObjectRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeObjectRelationAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: knowledgeObjectRelationKeys.detail(id),
      });
    },
  });
}
