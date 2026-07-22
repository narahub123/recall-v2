import { KNOWLEDGE_RELATION_TYPES } from "@/constants/knowledge-object-relation";
import { DateRangeValue, NumberRangeValue } from "../filter";

export const KNOWLEDGE_RELATION_FILTER_OPTIONS = [
  "all",
  ...KNOWLEDGE_RELATION_TYPES,
] as const;

export type KnowledgeRelationFilterType =
  (typeof KNOWLEDGE_RELATION_FILTER_OPTIONS)[number];

export interface KnowledgeObjectRelationFilter {
  relationTypes?: KnowledgeRelationFilterType[];
  numberRanges?: NumberRangeValue[];
  dateRanges?: DateRangeValue[];
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

export const KNOWLEDGE_RELATION_NUMBER_RANGE_OPTIONS = [
  {
    value: "confidence",
    label: "신뢰도",
  },
] as const;

export const KNOWLEDGE_RELATION_DATE_RANGE_FIELDS = [
  "createdAt",
  "updatedAt",
] as const;

export type KnowledgeObjectRelationDateField =
  (typeof KNOWLEDGE_RELATION_DATE_RANGE_FIELDS)[number];

export const KNOWLEDGE_RELATION_DATE_RANGE_OPTIONS = [
  {
    value: "createdAt",
    label: "생성일",
  },

  {
    value: "updatedAt",
    label: "수정일",
  },
] as const;
