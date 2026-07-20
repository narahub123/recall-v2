import { useQuery } from "@tanstack/react-query";

import { getNoteRelationsAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useNoteRelations() {
  return useQuery({
    queryKey: noteRelationKeys.list(),

    queryFn: () => getNoteRelationsAction(),
  });
}
