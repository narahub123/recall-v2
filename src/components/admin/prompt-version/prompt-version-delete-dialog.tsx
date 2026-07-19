"use client";

import { useRouter } from "next/navigation";

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

import { useDeletePromptVersion } from "@/hooks/prompt-version/mutations/use-delete-prompt-version";

type PromptVersionDeleteDialogProps = {
  id: string;
  promptGroupId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PromptVersionDeleteDialog({
  id,
  promptGroupId,
  open,
  onOpenChange,
}: PromptVersionDeleteDialogProps) {
  const router = useRouter();

  const { mutate: deletePromptVersion, isPending } = useDeletePromptVersion();

  function handleDelete() {
    deletePromptVersion(id, {
      onSuccess: () => {
        onOpenChange(false);

        router.push(`/admin/prompts/${promptGroupId}`);
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Prompt Version 삭제</AlertDialogTitle>

          <AlertDialogDescription>
            삭제된 Prompt Version은 복구할 수 없습니다. 삭제하시겠습니까?
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
