"use client";

import Link from "next/link";

interface Props {
  knowledgeObjects: {
    id: string;
    name: string;
  }[];
}

export function KnowledgeObjectGenerationObjectList({
  knowledgeObjects,
}: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Generated Knowledge Objects</p>

      {knowledgeObjects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          생성된 Knowledge Object가 없습니다.
        </p>
      ) : (
        <div className="space-y-1">
          {knowledgeObjects.map((knowledgeObject) => (
            <Link
              key={knowledgeObject.id}
              href={`/admin/knowledge-objects/${knowledgeObject.id}`}
              className="block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
            >
              {knowledgeObject.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
