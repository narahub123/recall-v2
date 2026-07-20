import { useQuery } from "@tanstack/react-query";

import { getNoteRelationAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useNoteRelation(id: string) {
  return useQuery({
    queryKey: noteRelationKeys.detail(id),

    queryFn: () => getNoteRelationAction(id),

    enabled: Boolean(id),
  });
}
