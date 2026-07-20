import type { KnowledgeObjectGenerationViewDTO } from "@/dto/knowledge-object-generation-view.dto";

import { KnowledgeObjectGenerationCard } from "./knowledge-object-generation-card";

interface Props {
  generations: KnowledgeObjectGenerationViewDTO[];
}

export function KnowledgeObjectGenerationList({ generations }: Props) {
  if (generations.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        생성 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {generations.map((generation) => (
        <KnowledgeObjectGenerationCard
          key={generation.id}
          generation={generation}
        />
      ))}
    </div>
  );
}
