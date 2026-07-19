import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateKnowledgeExtractionAction } from "@/actions/knowledge-extraction.actions";
import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";

export function useUpdateKnowledgeExtraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Parameters<typeof updateKnowledgeExtractionAction>[1] & {
        id: string;
      },
    ) =>
      updateKnowledgeExtractionAction(data.id, {
        ...data,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeExtractionKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: knowledgeExtractionKeys.lists(),
      });
    },
  });
}
