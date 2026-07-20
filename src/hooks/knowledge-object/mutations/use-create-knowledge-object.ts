import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeObjectAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";
import { EmbeddingModel } from "@/embedding/embedding-models";

export function useCreateKnowledgeObject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      noteId: string;

      extractionId?: string;

      promptVersionId: string;

      name: string;

      description: string;

      reason: string;

      parent?: string | null;

      embeddingText: string;

      embeddingModel: EmbeddingModel;

      embedding: number[];
    }) => createKnowledgeObjectAction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectKeys.lists(),
      });
    },
  });
}
