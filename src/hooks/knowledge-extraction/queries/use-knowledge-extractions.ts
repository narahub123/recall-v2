import { useQuery } from "@tanstack/react-query";

import { knowledgeExtractionKeys } from "@/lib/query-keys/knowledge-extraction.keys";
import { getKnowledgeExtractionsViewAction } from "@/actions/knowledge-extraction.actions";

export function useKnowledgeExtractions() {
  return useQuery({
    queryKey: knowledgeExtractionKeys.list(),

    queryFn: () => getKnowledgeExtractionsViewAction(),
  });
}
