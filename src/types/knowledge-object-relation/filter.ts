import { KNOWLEDGE_RELATION_TYPES } from "@/constants/knowledge-object-relation";

export const KNOWLEDGE_RELATION_FILTER_OPTIONS = [
  "all",
  ...KNOWLEDGE_RELATION_TYPES,
] as const;

export type KnowledgeRelationFilterType =
  (typeof KNOWLEDGE_RELATION_FILTER_OPTIONS)[number];

export interface KnowledgeObjectRelationFilter {
  relationTypes?: KnowledgeRelationFilterType[];
}

export const KNOWLEDGE_RELATION_TYPE_LABELS = {
  all: "전체",

  comparison: "비교",

  extension: "확장",

  alternative: "대안",

  criterion: "기준",
} satisfies Record<KnowledgeRelationFilterType, string>;

export const KNOWLEDGE_RELATION_BADGE_COLORS = {
  all: "bg-muted text-muted-foreground",

  comparison: "bg-blue-100 text-blue-700",

  extension: "bg-emerald-100 text-emerald-700",

  alternative: "bg-amber-100 text-amber-700",

  criterion: "bg-violet-100 text-violet-700",
} satisfies Partial<Record<KnowledgeRelationFilterType, string>>;
