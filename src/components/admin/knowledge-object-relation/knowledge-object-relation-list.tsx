import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { KnowledgeObjectRelationCard } from "./knowledge-object-relation-card";

interface Props {
  relations: KnowledgeObjectRelationDTO[];
}

export function KnowledgeObjectRelationList({ relations }: Props) {
  if (relations.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Knowledge Object Relation이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {relations.map((relation) => (
        <KnowledgeObjectRelationCard key={relation.id} relation={relation} />
      ))}
    </div>
  );
}
