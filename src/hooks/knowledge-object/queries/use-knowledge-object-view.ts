import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectViewAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObjectView(id: string) {
  return useQuery({
    queryKey: knowledgeObjectKeys.viewDetail(id),

    queryFn: () => getKnowledgeObjectViewAction(id),

    enabled: Boolean(id),
  });
}
