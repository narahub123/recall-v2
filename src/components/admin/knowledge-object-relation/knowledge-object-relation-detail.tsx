"use client";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  relation: KnowledgeObjectRelationDTO;
}

export function KnowledgeObjectRelationDetail({ relation }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{relation.relationType}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Source Knowledge Object
          </p>

          <p>{relation.sourceKnowledgeObjectId}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Target Knowledge Object
          </p>

          <p>{relation.targetKnowledgeObjectId}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Relation Type</p>

          <p>{relation.relationType}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Reason</p>

          <p>{relation.reason}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Confidence</p>

          <p>{relation.confidence}</p>
        </div>
      </CardContent>
    </Card>
  );
}
``