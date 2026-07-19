import { useQuery } from "@tanstack/react-query";

import { getPromptVersionsAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function usePromptVersions(promptGroupId: string) {
  return useQuery({
    queryKey: promptVersionKeys.list(promptGroupId),

    queryFn: () => getPromptVersionsAction(promptGroupId),

    enabled: Boolean(promptGroupId),
  });
}
