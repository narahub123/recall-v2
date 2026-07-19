"use client";

import { useForm } from "react-hook-form";

import { PromptGroupDTO } from "@/dto/prompt-group.dto";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdatePromptGroup } from "@/hooks/prompt-group/mutations/use-update-prompt-group";

type PromptGroupEditDialogProps = {
  promptGroup: PromptGroupDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type PromptGroupEditForm = {
  name: string;
  description: string;
};

export function PromptGroupEditDialog({
  promptGroup,
  open,
  onOpenChange,
}: PromptGroupEditDialogProps) {
  const { register, handleSubmit, reset } = useForm<PromptGroupEditForm>({
    defaultValues: {
      name: promptGroup.name,
      description: promptGroup.description ?? "",
    },
  });

  const { mutate: updatePromptGroup, isPending } = useUpdatePromptGroup();

  function onSubmit(data: PromptGroupEditForm) {
    updatePromptGroup(
      {
        id: promptGroup.id,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset(data);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prompt Group 수정</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Name"
            {...register("name", {
              required: true,
            })}
          />

          <Textarea placeholder="Description" {...register("description")} />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "수정 중..." : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
