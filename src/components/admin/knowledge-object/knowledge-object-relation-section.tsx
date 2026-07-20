"use client";

import Link from "next/link";
import { useState } from "react";

import { useKnowledgeObject } from "@/hooks/knowledge-object/queries/use-knowledge-object";
import { useKnowledgeObjectRelationsByKnowledgeObject } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relations-by-knowledge-object";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { KnowledgeObjectRelationCreateForm } from "@/components/admin/knowledge-object-relation/knowledge-object-relation-create-form";

interface RelationItemProps {
  relation: {
    id: string;
    sourceKnowledgeObjectId: string;
    targetKnowledgeObjectId: string;
    relationType: string;
    reason: string;
    confidence: number;
  };
}

function KnowledgeObjectRelationItem({ relation }: RelationItemProps) {
  const { data: sourceKnowledgeObject } = useKnowledgeObject(
    relation.sourceKnowledgeObjectId,
  );

  const { data: targetKnowledgeObject } = useKnowledgeObject(
    relation.targetKnowledgeObjectId,
  );

  return (
    <Link
      href={`/admin/knowledge-object-relations/${relation.id}`}
      className="block rounded-lg border p-4 hover:bg-muted"
    >
      <div className="space-y-2">
        <div className="font-medium">{relation.relationType}</div>

        <div className="text-sm">
          {sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId}

          {" → "}

          {targetKnowledgeObject?.name ?? relation.targetKnowledgeObjectId}
        </div>

        <div className="text-sm text-muted-foreground">
          {relation.reason || "-"}
        </div>

        <div className="text-xs text-muted-foreground">
          Confidence: {relation.confidence}
        </div>
      </div>
    </Link>
  );
}

interface Props {
  knowledgeObjectId: string;
}

export function KnowledgeObjectRelationSection({ knowledgeObjectId }: Props) {
  const [createOpen, setCreateOpen] = useState(false);

  const { data: relations, isLoading } =
    useKnowledgeObjectRelationsByKnowledgeObject(knowledgeObjectId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Knowledge Object Relations</CardTitle>

          <Button
            variant="outline"
            onClick={() => setCreateOpen((prev) => !prev)}
          >
            관계 추가
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {createOpen && (
          <KnowledgeObjectRelationCreateForm
            sourceKnowledgeObjectId={knowledgeObjectId}
            onSuccess={() => setCreateOpen(false)}
          />
        )}

        {!relations || relations.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            연결된 Knowledge Object Relation이 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {relations.map((relation) => (
              <KnowledgeObjectRelationItem
                key={relation.id}
                relation={relation}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
