import { useQuery } from "@tanstack/react-query";

import { getUserNotesAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";

export function useNotes() {
  return useQuery({
    queryKey: noteKeys.lists(),

    queryFn: () => getUserNotesAction(),
  });
}
