import { useQuery } from "@tanstack/react-query";

import { getKnowledgeObjectsByNoteIdAction } from "@/actions/knowledge-object.actions";
import { knowledgeObjectKeys } from "@/lib/query-keys/knowledge-object.keys";

export function useKnowledgeObjectsByNoteId(noteId: string) {
  return useQuery({
    queryKey: knowledgeObjectKeys.byNote(noteId),

    queryFn: () => getKnowledgeObjectsByNoteIdAction(noteId),

    enabled: Boolean(noteId),
  });
}
