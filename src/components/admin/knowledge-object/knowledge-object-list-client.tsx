"use client";

import { useKnowledgeObjectsView } from "@/hooks/knowledge-object/queries/use-knowledge-objects-view";

import { KnowledgeObjectList } from "./knowledge-object-list";

export function KnowledgeObjectListClient() {
  const { data: knowledgeObjects, isLoading } = useKnowledgeObjectsView();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <KnowledgeObjectList knowledgeObjects={knowledgeObjects ?? []} />;
}
