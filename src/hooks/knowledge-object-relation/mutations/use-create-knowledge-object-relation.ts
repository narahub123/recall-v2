import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeObjectRelationAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useCreateKnowledgeObjectRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      sourceKnowledgeObjectId: string;

      targetKnowledgeObjectId: string;

      relationType: string;

      reason: string;

      confidence: number;
    }) => createKnowledgeObjectRelationAction(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.byKnowledgeObject(
          variables.sourceKnowledgeObjectId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.byKnowledgeObject(
          variables.targetKnowledgeObjectId,
        ),
      });
    },
  });
}
