"use client";

import Link from "next/link";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { useKnowledgeObject } from "@/hooks/knowledge-object/queries/use-knowledge-object";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  relation: KnowledgeObjectRelationDTO;
}

export function KnowledgeObjectRelationCard({ relation }: Props) {
  const { data: sourceKnowledgeObject } = useKnowledgeObject(
    relation.sourceKnowledgeObjectId,
  );

  const { data: targetKnowledgeObject } = useKnowledgeObject(
    relation.targetKnowledgeObjectId,
  );

  return (
    <Link href={`/admin/knowledge-object-relations/${relation.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{relation.relationType}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Source</p>

            <p>
              {sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Target</p>

            <p>
              {targetKnowledgeObject?.name ?? relation.targetKnowledgeObjectId}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Reason</p>

            <p>{relation.reason || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Confidence</p>

            <p>{relation.confidence}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
