import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";
import { Block } from "@blocknote/core";

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title?: string; content: Block[] }) =>
      createNoteAction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });
    },
  });
}
