"use client";

import { useState } from "react";

import { useKnowledgeExtraction } from "@/hooks/knowledge-extraction/queries/use-knowledge-extraction";

import { KnowledgeExtractionDetail } from "./knowledge-extraction-detail";
import { KnowledgeExtractionEditForm } from "./knowledge-extraction-edit-form";
import { KnowledgeExtractionDeleteButton } from "./knowledge-extraction-delete-button";

import { Button } from "@/components/ui/button";

interface Props {
  id: string;
}

export function KnowledgeExtractionDetailClient({ id }: Props) {
  const [editMode, setEditMode] = useState(false);

  const { data: extraction, isLoading, isError } = useKnowledgeExtraction(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !extraction) {
    return <div>Knowledge Extraction을 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <KnowledgeExtractionEditForm
        extraction={extraction}
        onCancel={() => setEditMode(false)}
        onSuccess={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <KnowledgeExtractionDetail id={id} />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setEditMode(true)}>
          수정
        </Button>

        <KnowledgeExtractionDeleteButton id={extraction.id} />
      </div>
    </div>
  );
}
