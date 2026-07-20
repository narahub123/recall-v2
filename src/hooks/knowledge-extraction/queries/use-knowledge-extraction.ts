import { useQuery } from "@tanstack/react-query";

import { getKnowledgeExtractionViewAction } from "@/actions/knowledge-extraction.actions";
import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";

export function useKnowledgeExtraction(id: string) {
  return useQuery({
    queryKey: knowledgeExtractionKeys.detail(id),

    queryFn: () => getKnowledgeExtractionViewAction(id),

    enabled: Boolean(id),
  });
}
