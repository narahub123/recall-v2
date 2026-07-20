import { useQuery } from "@tanstack/react-query";

import { getAdminNotesAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";

export function useAdminNotes() {
  return useQuery({
    queryKey: noteKeys.adminLists(),

    queryFn: () => getAdminNotesAction(),
  });
}
