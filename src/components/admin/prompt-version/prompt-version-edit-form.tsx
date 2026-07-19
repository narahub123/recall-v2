"use client";

import { useForm } from "react-hook-form";

import { PromptVersionDTO } from "@/dto/prompt-version.dto";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUpdatePromptVersion } from "@/hooks/prompt-version/mutations/use-update-prompt-version";

type PromptVersionEditFormProps = {
  version: PromptVersionDTO;
  onCancel: () => void;
  onSuccess: () => void;
};

type PromptVersionEditFormValues = {
  content: string;
};

export function PromptVersionEditForm({
  version,
  onCancel,
  onSuccess,
}: PromptVersionEditFormProps) {
  const { register, handleSubmit } = useForm<PromptVersionEditFormValues>({
    defaultValues: {
      content: version.content,
    },
  });

  const { mutate: updatePromptVersion, isPending } = useUpdatePromptVersion();

  function onSubmit(data: PromptVersionEditFormValues) {
    updatePromptVersion(
      {
        id: version.id,
        content: data.content,
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        className="min-h-[500px]"
        {...register("content", {
          required: true,
        })}
      />

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "저장"}
        </Button>

        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
}
