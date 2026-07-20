import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectsViewAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObjectsView() {
  return useQuery({
    queryKey: knowledgeObjectKeys.viewList(),

    queryFn: () => getKnowledgeObjectsViewAction(),
  });
}
