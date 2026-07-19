import { useQuery } from "@tanstack/react-query";

import { getPromptGroupAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function usePromptGroup(id: string) {
  return useQuery({
    queryKey: promptGroupKeys.detail(id),

    queryFn: () => getPromptGroupAction(id),

    enabled: Boolean(id),
  });
}
