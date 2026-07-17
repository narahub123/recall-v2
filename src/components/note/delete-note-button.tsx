"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useDeleteNote } from "@/hooks/note/mutations/use-delete-note";

interface DeleteNoteButtonProps {
  id: string;
}

export function DeleteNoteButton({ id }: DeleteNoteButtonProps) {
  const router = useRouter();

  const deleteMutation = useDeleteNote();

  const handleDelete = async () => {
    const confirmed = window.confirm("노트를 삭제하시겠습니까?");

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(id);

    router.push("/notes");
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? "삭제 중..." : "삭제"}
    </Button>
  );
}
