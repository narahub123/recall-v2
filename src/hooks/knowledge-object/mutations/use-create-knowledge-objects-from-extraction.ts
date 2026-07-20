import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeObjectsFromExtractionAction } from "@/actions/knowledge-object-generation.actions";

import type { EmbeddingModel } from "@/embedding/embedding-models";

export function useCreateKnowledgeObjectsFromExtraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      extractionId,
      embeddingModel,
    }: {
      extractionId: string;

      embeddingModel: EmbeddingModel;
    }) =>
      createKnowledgeObjectsFromExtractionAction(
        extractionId,

        embeddingModel,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["knowledge-objects", "extraction", variables.extractionId],
      });
    },
  });
}
