import { useQuery } from "@tanstack/react-query";

import { getPromptGroupsAction } from "@/actions/prompt-group.actions";
import { promptGroupKeys } from "@/lib/query-keys/prompt-group.keys";

export function usePromptGroups() {
  return useQuery({
    queryKey: promptGroupKeys.lists(),

    queryFn: () => getPromptGroupsAction(),
  });
}
