import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";

import { KnowledgeExtractionCard } from "./knowledge-extraction-card";

type KnowledgeExtractionListProps = {
  extractions: KnowledgeExtractionDTO[];
};

export function KnowledgeExtractionList({
  extractions,
}: KnowledgeExtractionListProps) {
  if (extractions.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Knowledge Extraction이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {extractions.map((extraction) => (
        <KnowledgeExtractionCard key={extraction.id} extraction={extraction} />
      ))}
    </div>
  );
}
