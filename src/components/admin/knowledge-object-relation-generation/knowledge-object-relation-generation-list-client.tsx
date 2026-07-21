"use client";

import { useKnowledgeObjectRelationGenerationsView } from "@/hooks/knowledge-object-relation-generation/queries/use-knowledge-object-relation-generations-view";
import { KnowledgeObjectRelationGenerationList } from "./knowledge-object-relation-generation-list";

export function KnowledgeObjectRelationGenerationListClient() {
  const { data: generations, isLoading } =
    useKnowledgeObjectRelationGenerationsView();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <KnowledgeObjectRelationGenerationList generations={generations ?? []} />
  );
}
