"use client";

import { useKnowledgeObjectRelations } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relations";

import { KnowledgeObjectRelationList } from "./knowledge-object-relation-list";
import { KnowledgeObjectRelationCreateForm } from "./knowledge-object-relation-create-form";

export function KnowledgeObjectRelationListClient() {
  const { data: relations, isLoading } = useKnowledgeObjectRelations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <KnowledgeObjectRelationList relations={relations ?? []} />
    </div>
  );
}
