import { useQuery } from "@tanstack/react-query";

import { getNoteAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";

export function useNote(id: string) {
  return useQuery({
    queryKey: noteKeys.detail(id),

    queryFn: () => getNoteAction(id),

    enabled: Boolean(id),
  });
}
