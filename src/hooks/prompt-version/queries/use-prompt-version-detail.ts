import { useQuery } from "@tanstack/react-query";

import { getPromptVersionDetailAction } from "@/actions/prompt-version.actions";
import { promptVersionKeys } from "@/lib/query-keys/prompt-version.keys";

export function usePromptVersionDetail(id: string) {
  return useQuery({
    queryKey: promptVersionKeys.detailView(id),

    queryFn: () => getPromptVersionDetailAction(id),

    enabled: !!id,
  });
}
