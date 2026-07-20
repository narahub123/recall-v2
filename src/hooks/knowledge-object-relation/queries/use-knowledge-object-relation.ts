import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useKnowledgeObjectRelation(id: string) {
  return useQuery({
    queryKey: knowledgeObjectRelationKeys.detail(id),

    queryFn: () => getKnowledgeObjectRelationAction(id),

    enabled: Boolean(id),
  });
}
