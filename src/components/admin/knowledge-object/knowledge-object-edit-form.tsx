"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateKnowledgeObject } from "@/hooks/knowledge-object/mutations/use-update-knowledge-object";

interface KnowledgeObjectEditTarget {
  id: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  embeddingText: string;
}

interface Props {
  knowledgeObject: KnowledgeObjectEditTarget;

  onCancel: () => void;

  onSuccess: () => void;
}

interface KnowledgeObjectEditFormValues {
  name: string;

  description: string;

  reason: string;

  parent: string;

  embeddingText: string;
}

export function KnowledgeObjectEditForm({
  knowledgeObject,
  onCancel,
  onSuccess,
}: Props) {
  const { register, handleSubmit } = useForm<KnowledgeObjectEditFormValues>({
    defaultValues: {
      name: knowledgeObject.name,

      description: knowledgeObject.description,

      reason: knowledgeObject.reason,

      parent: knowledgeObject.parent ?? "",

      embeddingText: knowledgeObject.embeddingText,
    },
  });

  const { mutate: updateKnowledgeObject, isPending } =
    useUpdateKnowledgeObject();

  function onSubmit(data: KnowledgeObjectEditFormValues) {
    updateKnowledgeObject(
      {
        id: knowledgeObject.id,

        name: data.name,

        description: data.description,

        reason: data.reason,

        parent: data.parent || null,

        embeddingText: data.embeddingText,
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">Knowledge Object 수정</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>

          <Textarea {...register("reason")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Parent</label>

          <Input {...register("parent")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Embedding Text</label>

          <Textarea {...register("embeddingText")} />
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
