import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteKnowledgeObjectRelationGenerationAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useDeleteKnowledgeObjectRelationGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteKnowledgeObjectRelationGenerationAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.viewList(),
      });

      queryClient.removeQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.detail(id),
      });

      queryClient.removeQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.view(id),
      });
    },
  });
}
