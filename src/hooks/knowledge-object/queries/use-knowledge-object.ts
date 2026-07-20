import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObject(id: string) {
  return useQuery({
    queryKey: knowledgeObjectKeys.detail(id),

    queryFn: () => getKnowledgeObjectAction(id),

    enabled: Boolean(id),
  });
}
