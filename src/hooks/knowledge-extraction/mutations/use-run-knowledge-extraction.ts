import { useMutation } from "@tanstack/react-query";

import { runKnowledgeExtractionAction } from "@/actions/knowledge-extraction.actions";

export function useRunKnowledgeExtraction() {
  return useMutation({
    mutationFn: (data: {
      noteId: string;

      promptVersionId: string;

      model: string;

      temperature?: number;
    }) => runKnowledgeExtractionAction(data),
  });
}
