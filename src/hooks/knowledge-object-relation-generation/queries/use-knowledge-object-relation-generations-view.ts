import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectRelationGenerationsViewAction } from "@/actions/knowledge-object-relation-generation.actions";

import { knowledgeObjectRelationGenerationKeys } from "@/lib/query-keys/knowledge-object-relation-generation.keys";

export function useKnowledgeObjectRelationGenerationsView() {
  return useQuery({
    queryKey: knowledgeObjectRelationGenerationKeys.viewList(),

    queryFn: () => getKnowledgeObjectRelationGenerationsViewAction(),
  });
}
