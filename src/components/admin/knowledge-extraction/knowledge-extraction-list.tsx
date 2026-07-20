import { KnowledgeExtractionViewDTO } from "@/dto/knowledge-extraction-view.dto";

import { KnowledgeExtractionCard } from "./knowledge-extraction-card";

type KnowledgeExtractionListProps = {
  extractions: KnowledgeExtractionViewDTO[];
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
    <div className="space-y-4 flex flex-col">
      {extractions.map((extraction) => (
        <KnowledgeExtractionCard key={extraction.id} extraction={extraction} />
      ))}
    </div>
  );
}
