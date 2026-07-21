import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateKnowledgeObjectRelationGenerationAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";

export function useUpdateKnowledgeObjectRelationGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: {
      id: string;

      data: {
        results?: {
          sourceKnowledgeObjectId: string;

          targetKnowledgeObjectId: string;

          related: boolean;

          relationType?: string | null;

          reason?: string | null;

          confidence?: number | null;
        }[];

        knowledgeObjectRelationIds?: string[];

        usage?: {
          inputTokens: number;

          outputTokens: number;

          totalTokens: number;
        };

        status?: KnowledgeObjectRelationGenerationStatus;

        errorMessage?: string | null;
      };
    }) => updateKnowledgeObjectRelationGenerationAction(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.view(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeObjectRelationGenerationKeys.viewList(),
      });
    },
  });
}
