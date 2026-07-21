import type { KnowledgeObjectRelationGenerationViewDTO } from "@/dto/knowledge-object-relation-generation-view.dto";
import { KnowledgeObjectRelationGenerationCard } from "./knowledge-object-relation-generation-card";

interface Props {
  generations: KnowledgeObjectRelationGenerationViewDTO[];
}

export function KnowledgeObjectRelationGenerationList({ generations }: Props) {
  if (generations.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        생성 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col">
      {generations.map((generation) => (
        <KnowledgeObjectRelationGenerationCard
          key={generation.id}
          generation={generation}
        />
      ))}
    </div>
  );
}
