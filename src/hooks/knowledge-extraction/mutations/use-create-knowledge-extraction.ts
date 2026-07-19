import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeExtractionAction } from "@/actions/knowledge-extraction.actions";
import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";

export function useCreateKnowledgeExtraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createKnowledgeExtractionAction>[0]) =>
      createKnowledgeExtractionAction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: knowledgeExtractionKeys.lists(),
      });
    },
  });
}
