"use client";

import { useForm } from "react-hook-form";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateKnowledgeObjectRelation } from "@/hooks/knowledge-object-relation/mutations/use-update-knowledge-object-relation";

interface Props {
  relation: KnowledgeObjectRelationDTO;

  onCancel: () => void;

  onSuccess: () => void;
}

interface FormValues {
  relationType: string;

  reason: string;

  confidence: number;
}

export function KnowledgeObjectRelationEditForm({
  relation,

  onCancel,

  onSuccess,
}: Props) {
  const {
    register,

    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      relationType: relation.relationType,

      reason: relation.reason,

      confidence: relation.confidence,
    },
  });

  const {
    mutate: updateRelation,

    isPending,
  } = useUpdateKnowledgeObjectRelation();

  function onSubmit(data: FormValues) {
    updateRelation(
      {
        id: relation.id,

        relationType: data.relationType,

        reason: data.reason,

        confidence: data.confidence,
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Knowledge Object Relation 수정
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Relation Type</label>

          <Input
            {...register("relationType", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>

          <Textarea {...register("reason")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confidence</label>

          <Input
            type="number"
            step="0.01"
            {...register("confidence", {
              valueAsNumber: true,
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
