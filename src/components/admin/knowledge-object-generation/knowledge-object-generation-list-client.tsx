"use client";

import { useKnowledgeObjectGenerations } from "@/hooks/knowledge-object-generation/queries/use-knowledge-object-generations";

import { KnowledgeObjectGenerationList } from "./knowledge-object-generation-list";

export function KnowledgeObjectGenerationListClient() {
  const { data: generations, isLoading } = useKnowledgeObjectGenerations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <KnowledgeObjectGenerationList generations={generations ?? []} />;
}
