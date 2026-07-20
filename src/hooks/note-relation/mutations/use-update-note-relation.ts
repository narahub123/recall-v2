import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteRelationAction } from "@/actions/note-relation.actions";
import { noteRelationKeys } from "@/lib/query-keys/note-relation.keys";

export function useUpdateNoteRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      data,
    }: {
      id: string;

      data: {
        relationType?: string;

        reason?: string;

        confidence?: number;
      };
    }) =>
      updateNoteRelationAction(
        id,

        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteRelationKeys.all,
      });
    },
  });
}
