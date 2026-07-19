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

import { useDeletePromptGroup } from "@/hooks/prompt-group/mutations/use-delete-prompt-group";

type PromptGroupDeleteDialogProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PromptGroupDeleteDialog({
  id,
  open,
  onOpenChange,
}: PromptGroupDeleteDialogProps) {
  const { mutate: deletePromptGroup, isPending } = useDeletePromptGroup();

  function handleDelete() {
    deletePromptGroup(id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Prompt Group 삭제</AlertDialogTitle>

          <AlertDialogDescription>
            삭제한 Prompt Group은 복구할 수 없습니다. 계속 진행하시겠습니까?
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
