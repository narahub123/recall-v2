import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationGenerationsViewAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

import { ListQuery } from "@/types/list-query";
import { KnowledgeObjectRelationGenerationFilter } from "@/types/knowledge-object-relation-generation/filter";
import { KnowledgeObjectRelationGenerationSearch } from "@/types/knowledge-object-relation-generation/search";

export function useKnowledgeObjectRelationGenerationsView(
  query: ListQuery<
    KnowledgeObjectRelationGenerationFilter,
    KnowledgeObjectRelationGenerationSearch
  >,
) {
  return useQuery({
    queryKey: [...knowledgeObjectRelationGenerationKeys.viewList(query), query],

    queryFn: () => getKnowledgeObjectRelationGenerationsViewAction(query),

    placeholderData: (previousData) => previousData,
  });
}
