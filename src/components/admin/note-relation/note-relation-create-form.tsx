"use client";

import { useForm } from "react-hook-form";

import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { useCreateNoteRelation } from "@/hooks/note-relation/mutations/use-create-note-relation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  sourceNoteId?: string;

  onSuccess?: () => void;
}

interface FormValues {
  sourceNoteId: string;

  targetNoteId: string;

  relationType: string;

  reason: string;

  confidence: number;
}

export function NoteRelationCreateForm({ sourceNoteId, onSuccess }: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      sourceNoteId: sourceNoteId ?? "",

      targetNoteId: "",

      relationType: "",

      reason: "",

      confidence: 0,
    },
  });

  const {
    mutate: createNoteRelation,

    isPending,
  } = useCreateNoteRelation();

  function onSubmit(data: FormValues) {
    createNoteRelation(
      {
        ...data,

        confidence: Number(data.confidence),
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
      <h2 className="mb-6 text-xl font-semibold">Note Relation 생성</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Note ID</label>

          <Input
            {...register("sourceNoteId", {
              required: true,
            })}
            disabled={Boolean(sourceNoteId)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Note ID</label>

          <Input
            {...register("targetNoteId", {
              required: true,
            })}
          />
        </div>

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

          <Textarea
            {...register("reason", {
              required: true,
            })}
          />
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "생성"}
        </Button>
      </form>
    </section>
  );
}
