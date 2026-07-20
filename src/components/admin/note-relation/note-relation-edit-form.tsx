"use client";

import { useForm } from "react-hook-form";

import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { useUpdateNoteRelation } from "@/hooks/note-relation/mutations/use-update-note-relation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  noteRelation: NoteRelationDTO;

  onCancel: () => void;

  onSuccess: () => void;
}

interface FormValues {
  relationType: string;

  reason: string;

  confidence: number;
}

export function NoteRelationEditForm({
  noteRelation,

  onCancel,

  onSuccess,
}: Props) {
  const {
    register,

    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      relationType: noteRelation.relationType,

      reason: noteRelation.reason,

      confidence: noteRelation.confidence,
    },
  });

  const {
    mutate: updateNoteRelation,

    isPending,
  } = useUpdateNoteRelation();

  function onSubmit(data: FormValues) {
    updateNoteRelation(
      {
        id: noteRelation.id,

        data: {
          relationType: data.relationType,

          reason: data.reason,

          confidence: Number(data.confidence),
        },
      },
      {
        onSuccess,
      },
    );
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-6 text-xl font-semibold">Note Relation 수정</h2>

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
