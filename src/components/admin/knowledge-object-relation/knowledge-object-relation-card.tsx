"use client";

import Link from "next/link";

import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { useKnowledgeObject } from "@/hooks/knowledge-object/queries/use-knowledge-object";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

import { RelationTypeIndicator } from "./relation-type-indicator";
import type { KnowledgeRelationType } from "@/constants/knowledge-object-relation";

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
    <Link
      href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECT_RELATIONS}/${relation.id}`}
      className="block"
    >
      <div
        className={cn(
          "flex items-center justify-center gap-3",
          "rounded-lg border p-4",
          "transition hover:bg-muted/50",
        )}
      >
        <span className={cn("w-48 truncate text-right", "font-semibold")}>
          {sourceKnowledgeObject?.name ?? relation.sourceKnowledgeObjectId}
        </span>

        <RelationTypeIndicator
          type={relation.relationType as KnowledgeRelationType}
        />

        <span className={cn("w-48 truncate text-left", "font-semibold")}>
          {targetKnowledgeObject?.name ?? relation.targetKnowledgeObjectId}
        </span>
      </div>
    </Link>
  );
}
