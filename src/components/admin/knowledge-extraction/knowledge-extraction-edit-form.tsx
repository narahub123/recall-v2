"use client";

import { useForm } from "react-hook-form";

import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateKnowledgeExtraction } from "@/hooks/knowledge-extraction/mutations/use-update-knowledge-extraction";

type KnowledgeExtractionEditFormProps = {
  extraction: KnowledgeExtractionDetailDTO;
  onCancel: () => void;
  onSuccess: () => void;
};

type KnowledgeExtractionEditFormValues = {
  promptSnapshot: string;
  model: string;
  temperature: number;
  responseFormat: string;
};

export function KnowledgeExtractionEditForm({
  extraction,
  onCancel,
  onSuccess,
}: KnowledgeExtractionEditFormProps) {
  const { register, handleSubmit } = useForm<KnowledgeExtractionEditFormValues>(
    {
      defaultValues: {
        promptSnapshot: extraction.promptSnapshot,
        model: extraction.model,
        temperature: extraction.temperature,
        responseFormat: extraction.responseFormat,
      },
    },
  );

  const { mutate: updateKnowledgeExtraction, isPending } =
    useUpdateKnowledgeExtraction();

  function onSubmit(data: KnowledgeExtractionEditFormValues) {
    updateKnowledgeExtraction(
      {
        id: extraction.id,
        ...data,
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">Knowledge Extraction 수정</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>

          <Input
            {...register("model", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Temperature</label>

          <Input
            type="number"
            step="0.1"
            {...register("temperature", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Response Format</label>

          <Input
            {...register("responseFormat", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prompt Snapshot</label>

          <Textarea
            rows={10}
            {...register("promptSnapshot", {
              required: true,
            })}
          />
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
