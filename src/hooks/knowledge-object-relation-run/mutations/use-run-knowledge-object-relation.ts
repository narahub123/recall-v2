import { useMutation, useQueryClient } from "@tanstack/react-query";

import { runKnowledgeObjectRelationAction } from "@/actions/knowledge-object-relation-run.action";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";
import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useRunKnowledgeObjectRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: runKnowledgeObjectRelationAction,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.byKnowledgeObject(
          variables.knowledgeObjectId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationKeys.byKnowledgeObject(
          variables.knowledgeObjectId,
        ),
      });
    },
  });
}
