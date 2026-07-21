"use client";

import { useKnowledgeExtractions } from "@/hooks/knowledge-extraction/queries/use-knowledge-extractions";
import { KnowledgeExtractionList } from "./knowledge-extraction-list";


export function KnowledgeExtractionClient() {
  const { data: extractions, isLoading, isError } = useKnowledgeExtractions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>불러오기에 실패했습니다.</div>;
  }

  return <KnowledgeExtractionList extractions={extractions ?? []} />;
}
