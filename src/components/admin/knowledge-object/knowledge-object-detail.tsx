"use client";

import { useEffect, useState } from "react";

import { useKnowledgeObjectView } from "@/hooks/knowledge-object/queries/use-knowledge-object-view";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { KnowledgeObjectDeleteDialog } from "./knowledge-object-delete-dialog";
import { KnowledgeObjectEditForm } from "./knowledge-object-edit-form";
import { KnowledgeObjectRelationSection } from "./knowledge-object-relation-section";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import { ROUTES } from "@/constants/routes";
import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";
import { KnowledgeObjectRelationRunSection } from "./knowledge-object-relation-run-section";

interface Props {
  id: string;
}

export function KnowledgeObjectDetail({ id }: Props) {
  const [editMode, setEditMode] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    data: knowledgeObject,
    isLoading,
    isError,
  } = useKnowledgeObjectView(id);

  const { setDynamicItems } = useAdminBreadcrumb();

  useEffect(() => {
    if (!knowledgeObject) {
      return;
    }

    setDynamicItems([
      {
        label: knowledgeObject.name ?? "상세",
      },
    ]);
  }, [knowledgeObject, setDynamicItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !knowledgeObject) {
    return <div>Knowledge Object를 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <KnowledgeObjectEditForm
        knowledgeObject={knowledgeObject}
        onCancel={() => setEditMode(false)}
        onSuccess={() => setEditMode(false)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{knowledgeObject.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Description</p>

          <p>{knowledgeObject.description || "설명이 없습니다."}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Reason</p>

          <p>{knowledgeObject.reason || "설명이 없습니다."}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Parent</p>

          <p>{knowledgeObject.parent || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Note</p>

          <p>{knowledgeObject.note.title ?? "제목 없음"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Prompt</p>

          <p>
            {knowledgeObject.promptGroup.name} v
            {knowledgeObject.promptVersion.version}
          </p>
        </div>

        {knowledgeObject.extraction && (
          <div>
            <p className="text-sm text-muted-foreground">Extraction Model</p>

            <p>{knowledgeObject.extraction.model}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground">Embedding Text</p>

          <p className="whitespace-pre-wrap">{knowledgeObject.embeddingText}</p>
        </div>

        <KnowledgeObjectRelationRunSection
          knowledgeObjectId={knowledgeObject.id}
        />

        <KnowledgeObjectRelationSection
          knowledgeObjectId={knowledgeObject.id}
        />
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" onClick={() => setEditMode(true)}>
          수정
        </Button>

        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          삭제
        </Button>
      </CardFooter>

      <KnowledgeObjectDeleteDialog
        id={knowledgeObject.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </Card>
  );
}
