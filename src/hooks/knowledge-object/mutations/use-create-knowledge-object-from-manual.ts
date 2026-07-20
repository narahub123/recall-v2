import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledgeObjectFromManualAction } from "@/actions/knowledge-object.actions";

import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useCreateKnowledgeObjectFromManual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKnowledgeObjectFromManualAction,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: knowledgeObjectKeys.list(),
      });
    },
  });
}
