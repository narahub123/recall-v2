import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationsByKnowledgeObjectIdAction } from "@/actions/knowledge-object-relation.actions";

import { knowledgeObjectRelationKeys } from "@/lib/query-keys/knowledge-object-relation.keys";

export function useKnowledgeObjectRelationsByKnowledgeObject(
  knowledgeObjectId: string,
) {
  return useQuery({
    queryKey: knowledgeObjectRelationKeys.byKnowledgeObject(knowledgeObjectId),

    queryFn: () =>
      getKnowledgeObjectRelationsByKnowledgeObjectIdAction(knowledgeObjectId),

    enabled: Boolean(knowledgeObjectId),
  });
}
