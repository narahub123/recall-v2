import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationsAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

import type { ListQuery } from "@/types/list-query";
import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import type { KnowledgeObjectRelationSearch } from "@/types/knowledge-object-relation/search";

export function useKnowledgeObjectRelations(
  query: ListQuery<
    KnowledgeObjectRelationFilter,
    KnowledgeObjectRelationSearch
  >,
) {
  return useQuery({
    queryKey: knowledgeObjectRelationKeys.list(query),

    queryFn: () => getKnowledgeObjectRelationsAction(query),

    placeholderData: (previousData) => previousData,
  });
}
