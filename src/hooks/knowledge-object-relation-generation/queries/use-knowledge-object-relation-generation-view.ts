import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationGenerationViewAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useKnowledgeObjectRelationGenerationView(id: string) {
  return useQuery({
    queryKey: knowledgeObjectRelationGenerationKeys.view(id),

    queryFn: () => getKnowledgeObjectRelationGenerationViewAction(id),

    enabled: Boolean(id),
  });
}
