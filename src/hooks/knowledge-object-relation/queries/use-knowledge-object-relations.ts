import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationsAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

import type { ListQuery } from "@/types/pagination";

export function useKnowledgeObjectRelations(query: ListQuery) {
  return useQuery({
    queryKey: knowledgeObjectRelationKeys.list(query),

    queryFn: () => getKnowledgeObjectRelationsAction(query),
  });
}
