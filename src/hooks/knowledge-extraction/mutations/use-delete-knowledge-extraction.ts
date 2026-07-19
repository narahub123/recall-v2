import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteKnowledgeExtractionAction } from "@/actions/knowledge-extraction.actions";
import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";

export function useDeleteKnowledgeExtraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeExtractionAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: knowledgeExtractionKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: knowledgeExtractionKeys.detail(id),
      });
    },
  });
}
