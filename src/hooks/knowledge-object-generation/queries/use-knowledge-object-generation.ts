import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectGenerationAction, getKnowledgeObjectGenerationViewAction } from "@/actions/knowledge-object-generation.actions";

import { knowledgeObjectGenerationKeys } from "@/lib/query-keys/knowledge-object-generation.keys";

export function useKnowledgeObjectGeneration(id: string) {
  return useQuery({
    queryKey: knowledgeObjectGenerationKeys.detail(id),

    queryFn: () => getKnowledgeObjectGenerationViewAction(id),

    enabled: Boolean(id),
  });
}
