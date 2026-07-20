import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectsAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObjects() {
  return useQuery({
    queryKey: knowledgeObjectKeys.list(),

    queryFn: () => getKnowledgeObjectsAction(),
  });
}
