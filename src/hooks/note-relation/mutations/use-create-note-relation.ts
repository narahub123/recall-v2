import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteRelationAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useCreateNoteRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNoteRelationAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteRelationKeys.all,
      });
    },
  });
}
