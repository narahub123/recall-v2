import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeObjectRelationGenerationAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";

export function useCreateKnowledgeObjectRelationGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      knowledgeObjectId: string;

      promptVersionId: string;

      promptSnapshot: string;

      model: string;

      temperature: number;

      responseFormat: string;

      candidateKnowledgeObjectIds: string[];

      knowledgeObjectRelationIds: string[];

      results: {
        sourceKnowledgeObjectId: string;

        targetKnowledgeObjectId: string;

        related: boolean;

        relationType?: string | null;

        reason?: string | null;

        confidence?: number | null;
      }[];

      usage: {
        inputTokens: number;

        outputTokens: number;

        totalTokens: number;
      };

      status: KnowledgeObjectRelationGenerationStatus;

      errorMessage?: string | null;
    }) => createKnowledgeObjectRelationGenerationAction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.viewList(),
      });
    },
  });
}
