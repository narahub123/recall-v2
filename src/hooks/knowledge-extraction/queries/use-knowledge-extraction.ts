import { useQuery } from "@tanstack/react-query";

import { getKnowledgeExtractionAction } from "@/actions/knowledge-extraction.actions";
import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";

export function useKnowledgeExtraction(id: string) {
  return useQuery({
    queryKey: knowledgeExtractionKeys.detail(id),

    queryFn: () => getKnowledgeExtractionAction(id),

    enabled: Boolean(id),
  });
}
