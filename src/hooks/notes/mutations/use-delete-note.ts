import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNoteAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: noteKeys.detail(id),
      });
    },
  });
}
