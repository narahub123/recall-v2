"use client";

import Link from "next/link";
import { useEffect } from "react";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { useKnowledgeObject } from "@/hooks/knowledge-object/queries/use-knowledge-object";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";
import { ROUTES } from "@/constants/routes";

interface Props {
  relation: KnowledgeObjectRelationDTO;

  onEdit: () => void;

  onDelete: () => void;
}

interface DetailFieldProps {
  label: string;

  value: React.ReactNode;

  href?: string;
}

function DetailField({ label, value, href }: DetailFieldProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      {href ? (
        <Link href={href} className="hover:bg-muted">
          {value}
        </Link>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

export function KnowledgeObjectRelationDetail({
  relation,
  onEdit,
  onDelete,
}: Props) {
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
        <div className="flex items-center justify-between">
          <CardTitle>
            {sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId}
          </CardTitle>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              수정
            </Button>

            <Button variant="destructive" onClick={onDelete}>
              삭제
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <DetailField
          label="Source Knowledge Object"
          value={
            sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId
          }
          href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECTS}/${relation.sourceKnowledgeObjectId}`}
        />

        <DetailField
          label="Target Knowledge Object"
          value={
            targetKnowledgeObject?.name ?? relation.targetKnowledgeObjectId
          }
          href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECTS}/${relation.targetKnowledgeObjectId}`}
        />

        <DetailField label="Relation Type" value={relation.relationType} />

        <DetailField label="Reason" value={relation.reason || "-"} />

        <DetailField label="Confidence" value={relation.confidence} />

        <DetailField
          label="Created At"
          value={new Date(relation.createdAt).toLocaleString()}
        />

        <DetailField
          label="Updated At"
          value={new Date(relation.updatedAt).toLocaleString()}
        />
      </CardContent>
    </Card>
  );
}
