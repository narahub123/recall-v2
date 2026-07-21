"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useCreatePromptVersion } from "@/hooks/prompt-version/mutations/use-create-prompt-version";
import { ROUTES } from "@/constants/routes";

type PromptVersionFormProps = {
  promptGroupId: string;
};

type PromptVersionFormValues = {
  content: string;
};

export function PromptVersionForm({ promptGroupId }: PromptVersionFormProps) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<PromptVersionFormValues>();

  const { mutate: createPromptVersion, isPending } = useCreatePromptVersion();

  function onSubmit(data: PromptVersionFormValues) {
    createPromptVersion(
      {
        promptGroupId,
        content: data.content,
      },
      {
        onSuccess: () => {
          router.push(`${ROUTES.ADMIN.PROMPTS}/${promptGroupId}`);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        className="min-h-100"
        placeholder="LLM Prompt 내용을 입력하세요."
        {...register("content", {
          required: true,
        })}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "생성 중..." : "생성"}
      </Button>
    </form>
  );
}
