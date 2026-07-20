"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteKnowledgeObject } from "@/hooks/knowledge-object/mutations/use-delete-knowledge-object";

interface Props {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KnowledgeObjectDeleteDialog({ id, open, onOpenChange }: Props) {
  const { mutate: deleteKnowledgeObject, isPending } =
    useDeleteKnowledgeObject();

  function handleDelete() {
    deleteKnowledgeObject(id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Knowledge Object 삭제</AlertDialogTitle>

          <AlertDialogDescription>
            삭제한 Knowledge Object는 복구할 수 없습니다. 계속 진행하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "삭제 중..." : "삭제"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
