import { useQuery } from "@tanstack/react-query";

import { getNoteRelationsByNoteIdAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useNoteRelationsByNoteId(noteId: string) {
  return useQuery({
    queryKey: noteRelationKeys.byNote(noteId),

    queryFn: () => getNoteRelationsByNoteIdAction(noteId),

    enabled: Boolean(noteId),
  });
}
