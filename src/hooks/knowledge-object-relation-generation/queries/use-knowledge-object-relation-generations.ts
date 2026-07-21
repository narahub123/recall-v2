import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationGenerationsAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useKnowledgeObjectRelationGenerations() {
  return useQuery({
    queryKey: knowledgeObjectRelationGenerationKeys.list(),

    queryFn: () => getKnowledgeObjectRelationGenerationsAction(),
  });
}
