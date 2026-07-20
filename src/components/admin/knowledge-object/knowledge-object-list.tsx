import { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";
import { KnowledgeObjectCard } from "./knowledge-object-card";

interface Props {
  knowledgeObjects: KnowledgeObjectDTO[];
}

export function KnowledgeObjectList({ knowledgeObjects }: Props) {
  if (knowledgeObjects.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Knowledge Object가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {knowledgeObjects.map((knowledgeObject) => (
        <KnowledgeObjectCard
          key={knowledgeObject.id}
          knowledgeObject={knowledgeObject}
        />
      ))}
    </div>
  );
}
