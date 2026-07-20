"use client";

import { useForm } from "react-hook-form";

import { useKnowledgeObjects } from "@/hooks/knowledge-object/queries/use-knowledge-objects";
import { useCreateKnowledgeObjectRelation } from "@/hooks/knowledge-object-relation/mutations/use-create-knowledge-object-relation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  sourceKnowledgeObjectId?: string;

  onSuccess?: () => void;
}

interface FormValues {
  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  relationType: string;

  reason: string;

  confidence: number;
}

export function KnowledgeObjectRelationCreateForm({
  sourceKnowledgeObjectId = "",
  onSuccess,
}: Props) {
  const { data: knowledgeObjects } = useKnowledgeObjects();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      sourceKnowledgeObjectId,

      targetKnowledgeObjectId: "",

      relationType: "",

      reason: "",

      confidence: 0,
    },
  });

  const {
    mutate: createRelation,

    isPending,
  } = useCreateKnowledgeObjectRelation();

  function onSubmit(data: FormValues) {
    createRelation(
      {
        sourceKnowledgeObjectId: data.sourceKnowledgeObjectId,

        targetKnowledgeObjectId: data.targetKnowledgeObjectId,

        relationType: data.relationType,

        reason: data.reason,

        confidence: data.confidence,
      },
      {
        onSuccess: () => {
          reset();

          onSuccess?.();
        },
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Knowledge Object Relation 생성
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Knowledge Object</label>

          <select
            {...register("sourceKnowledgeObjectId", {
              required: true,
            })}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">선택</option>

            {knowledgeObjects?.map((object) => (
              <option key={object.id} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Knowledge Object</label>

          <select
            {...register("targetKnowledgeObjectId", {
              required: true,
            })}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">선택</option>

            {knowledgeObjects?.map((object) => (
              <option key={object.id} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Relation Type</label>

          <input
            {...register("relationType", {
              required: true,
            })}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>

          <Textarea {...register("reason")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confidence</label>

          <input
            type="number"
            step="0.01"
            {...register("confidence", {
              valueAsNumber: true,
            })}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "생성 중..." : "생성"}
        </Button>
      </form>
    </section>
  );
}
