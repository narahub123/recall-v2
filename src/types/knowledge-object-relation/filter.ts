import { KNOWLEDGE_RELATION_TYPES } from "@/constants/knowledge-object-relation";

export const KNOWLEDGE_RELATION_FILTER_OPTIONS = [
  "all",
  ...KNOWLEDGE_RELATION_TYPES,
] as const;

export type KnowledgeRelationFilterType =
  (typeof KNOWLEDGE_RELATION_FILTER_OPTIONS)[number];

export interface KnowledgeObjectRelationFilter {
  relationType?: KnowledgeRelationFilterType;
}

export const KNOWLEDGE_RELATION_TYPE_LABELS = {
  all: "전체",

  comparison: "비교",

  extension: "확장",

  alternative: "대안",

  criterion: "기준",
} satisfies Record<KnowledgeRelationFilterType, string>;
