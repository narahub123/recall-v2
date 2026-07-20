"use client";

import { useState } from "react";

import { useNoteRelation } from "@/hooks/note-relation/queries/use-note-relation";

import { Button } from "@/components/ui/button";

import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb";

import { NoteRelationDetail } from "./note-relation-detail";
import { NoteRelationEditForm } from "./note-relation-edit-form";
import { NoteRelationDeleteDialog } from "./note-relation-delete-dialog";

interface Props {
  id: string;
}

export function NoteRelationDetailClient({ id }: Props) {
  const [editMode, setEditMode] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    data: noteRelation,

    isLoading,

    isError,
  } = useNoteRelation(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !noteRelation) {
    return <div>Note Relation을 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <NoteRelationEditForm
        noteRelation={noteRelation}
        onCancel={() => setEditMode(false)}
        onSuccess={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          {
            label: "Note Relations",
            href: "/admin/note-relations",
          },
          {
            label: noteRelation.relationType,
          },
        ]}
      />

      <NoteRelationDetail noteRelation={noteRelation} />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode(true)}>
          수정
        </Button>

        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          삭제
        </Button>
      </div>

      <NoteRelationDeleteDialog
        id={noteRelation.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
