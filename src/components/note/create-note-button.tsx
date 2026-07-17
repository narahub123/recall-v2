"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useCreateNote } from "@/hooks/note/mutations/use-create-note";
import { createEmptyNoteContent } from "@/lib/blocknote";

export function CreateNoteButton() {
  const router = useRouter();

  const createNoteMutation = useCreateNote();

  const handleCreate = async () => {
    const note = await createNoteMutation.mutateAsync({
      title: "",
      content: createEmptyNoteContent(),
    });

    router.push(`/notes/${note.id}`);
  };

  return (
    <Button onClick={handleCreate} disabled={createNoteMutation.isPending}>
      {createNoteMutation.isPending ? "생성 중..." : "새 노트"}
    </Button>
  );
}
