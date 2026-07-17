import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteAction } from "@/actions/note.actions";
import { noteKeys } from "@/lib/query-keys/note.keys";

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title?: string;
        content?: unknown;
      };
    }) => updateNoteAction(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: noteKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: noteKeys.lists(),
      });
    },
  });
}
