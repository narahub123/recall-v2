"use client";

import { useForm } from "react-hook-form";

import { PromptGroupDTO } from "@/dto/prompt-group.dto";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdatePromptGroup } from "@/hooks/prompt-group/mutations/use-update-prompt-group";

type PromptGroupEditFormProps = {
  promptGroup: PromptGroupDTO;
  onCancel: () => void;
  onSuccess: () => void;
};

type PromptGroupEditFormValues = {
  name: string;
  description: string;
};

export function PromptGroupEditForm({
  promptGroup,
  onCancel,
  onSuccess,
}: PromptGroupEditFormProps) {
  const { register, handleSubmit } = useForm<PromptGroupEditFormValues>({
    defaultValues: {
      name: promptGroup.name,
      description: promptGroup.description ?? "",
    },
  });

  const { mutate: updatePromptGroup, isPending } = useUpdatePromptGroup();

  function onSubmit(data: PromptGroupEditFormValues) {
    updatePromptGroup(
      {
        id: promptGroup.id,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">Prompt Group 수정</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>

          <Input value={promptGroup.key} disabled />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <Input
            {...register("name", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea {...register("description")} />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "저장 중..." : "저장"}
          </Button>

          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
    </section>
  );
}
