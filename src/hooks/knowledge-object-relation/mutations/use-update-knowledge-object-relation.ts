import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateKnowledgeObjectRelationAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useUpdateKnowledgeObjectRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;

      relationType?: string;

      reason?: string;

      confidence?: number;
    }) =>
      updateKnowledgeObjectRelationAction(data.id, {
        relationType: data.relationType,

        reason: data.reason,

        confidence: data.confidence,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.lists(),
      });
    },
  });
}
