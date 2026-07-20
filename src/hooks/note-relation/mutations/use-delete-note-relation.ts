import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteRelationAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useDeleteNoteRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoteRelationAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteRelationKeys.all,
      });
    },
  });
}
