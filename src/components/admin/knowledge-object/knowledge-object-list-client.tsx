"use client";

import { useKnowledgeObjects } from "@/hooks/knowledge-object/queries/use-knowledge-objects";

import { KnowledgeObjectList } from "./knowledge-object-list";

export function KnowledgeObjectListClient() {
  const { data: knowledgeObjects, isLoading } = useKnowledgeObjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <KnowledgeObjectList knowledgeObjects={knowledgeObjects ?? []} />;
}
