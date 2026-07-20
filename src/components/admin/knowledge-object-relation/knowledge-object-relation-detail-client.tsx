"use client";

import { useState } from "react";

import { useKnowledgeObjectRelation } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relation";

import { Button } from "@/components/ui/button";

import { AdminBreadcrumb } from "@/components/admin/common/admin-breadcrumb";

import { KnowledgeObjectRelationDeleteDialog } from "./knowledge-object-relation-delete-dialog";
import { KnowledgeObjectRelationDetail } from "./knowledge-object-relation-detail";
import { KnowledgeObjectRelationEditForm } from "./knowledge-object-relation-edit-form";

interface Props {
  id: string;
}

export function KnowledgeObjectRelationDetailClient({ id }: Props) {
  const [editMode, setEditMode] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    data: relation,

    isLoading,

    isError,
  } = useKnowledgeObjectRelation(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !relation) {
    return <div>Knowledge Object Relation을 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <KnowledgeObjectRelationEditForm
        relation={relation}
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
            label: "Knowledge Object Relations",
            href: "/admin/knowledge-object-relations",
          },
          {
            label: relation.relationType,
          },
        ]}
      />

      <KnowledgeObjectRelationDetail relation={relation} />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode(true)}>
          수정
        </Button>

        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          삭제
        </Button>
      </div>

      <KnowledgeObjectRelationDeleteDialog
        id={relation.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
