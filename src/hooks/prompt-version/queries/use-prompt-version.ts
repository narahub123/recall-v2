import { useQuery } from "@tanstack/react-query";

import { getPromptVersionAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function usePromptVersion(id: string) {
  return useQuery({
    queryKey: promptVersionKeys.detail(id),

    queryFn: () => getPromptVersionAction(id),

    enabled: Boolean(id),
  });
}
