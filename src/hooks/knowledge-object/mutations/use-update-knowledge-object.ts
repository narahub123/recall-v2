import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateKnowledgeObjectAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useUpdateKnowledgeObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;

      name?: string;

      description?: string;

      reason?: string;

      parent?: string | null;

      embeddingText?: string;
    }) =>
      updateKnowledgeObjectAction(data.id, {
        name: data.name,

        description: data.description,

        reason: data.reason,

        parent: data.parent,

        embeddingText: data.embeddingText,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectKeys.lists(),
      });
    },
  });
}
