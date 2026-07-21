import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationGenerationAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useKnowledgeObjectRelationGeneration(id: string) {
  return useQuery({
    queryKey: knowledgeObjectRelationGenerationKeys.detail(id),

    queryFn: () => getKnowledgeObjectRelationGenerationAction(id),

    enabled: Boolean(id),
  });
}
