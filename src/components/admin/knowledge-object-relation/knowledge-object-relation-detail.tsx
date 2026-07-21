"use client";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { useKnowledgeObject } from "@/hooks/knowledge-object/queries/use-knowledge-object";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";
import { useEffect } from "react";

interface Props {
  relation: KnowledgeObjectRelationDTO;
}

export function KnowledgeObjectRelationDetail({ relation }: Props) {
  const { data: sourceKnowledgeObject } = useKnowledgeObject(
    relation.sourceKnowledgeObjectId,
  );

  const { data: targetKnowledgeObject } = useKnowledgeObject(
    relation.targetKnowledgeObjectId,
  );

  const { setDynamicItems } = useAdminBreadcrumb();

  useEffect(() => {
    if (!sourceKnowledgeObject) {
      return;
    }

    setDynamicItems([
      {
        label: sourceKnowledgeObject.name ?? "상세",
      },
    ]);
  }, [sourceKnowledgeObject, setDynamicItems]);

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

          <p>
            {sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Target Knowledge Object
          </p>

          <p>
            {targetKnowledgeObject?.name ?? relation.targetKnowledgeObjectId}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Relation Type</p>

          <p>{relation.relationType}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Reason</p>

          <p>{relation.reason || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Confidence</p>

          <p>{relation.confidence}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Created At</p>

          <p>{new Date(relation.createdAt).toLocaleString()}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Updated At</p>

          <p>{new Date(relation.updatedAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
