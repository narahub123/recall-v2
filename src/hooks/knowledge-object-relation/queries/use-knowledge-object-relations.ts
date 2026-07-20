import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationsAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useKnowledgeObjectRelations() {
  return useQuery({
    queryKey: knowledgeObjectRelationKeys.list(),

    queryFn: () => getKnowledgeObjectRelationsAction(),
  });
}
