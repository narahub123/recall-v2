import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectGenerationsViewAction } from "@/actions/knowledge-object-generation.actions";

import { knowledgeObjectGenerationKeys } from "@/lib/query-keys/knowledge-object-generation.keys";

export function useKnowledgeObjectGenerations() {
  return useQuery({
    queryKey: knowledgeObjectGenerationKeys.list(),

    queryFn: () => getKnowledgeObjectGenerationsViewAction(),
  });
}
