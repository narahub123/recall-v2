import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectsByExtractionIdAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObjectsByExtractionId(extractionId: string) {
  return useQuery({
    queryKey: knowledgeObjectKeys.byExtraction(extractionId),

    queryFn: () => getKnowledgeObjectsByExtractionIdAction(extractionId),

    enabled: Boolean(extractionId),
  });
}
