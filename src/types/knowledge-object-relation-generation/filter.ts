import { LLM_MODELS } from "@/llm/llm-model";
import { KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS } from ".";
import { DateRangeValue, NumberRangeValue } from "../filter";

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_OPTIONS = [
  "all",
  KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.PROCESSING,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.COMPLETED,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.FAILED,
] as const;

export type KnowledgeObjectRelationGenerationStatusFilterType =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_OPTIONS)[number];

export interface KnowledgeObjectRelationGenerationFilter {
  statuses?: KnowledgeObjectRelationGenerationStatusFilterType[];

  models?: KnowledgeObjectRelationGenerationModelFilterType[];

  numberRanges?: NumberRangeValue[];

  dateRanges?: DateRangeValue[];

  errorStatus?: KnowledgeObjectRelationGenerationErrorFilterType;
}

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_LABELS = {
  all: "전체",

  PROCESSING: "처리 중",

  COMPLETED: "완료",

  FAILED: "실패",
} satisfies Record<KnowledgeObjectRelationGenerationStatusFilterType, string>;

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_DATE_RANGE_FIELDS = [
  "createdAt",

  "updatedAt",
] as const;

export type KnowledgeObjectRelationGenerationDateField =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_DATE_RANGE_FIELDS)[number];

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_DATE_RANGE_OPTIONS = [
  {
    value: "createdAt",

    label: "생성일",
  },

  {
    value: "updatedAt",

    label: "수정일",
  },
] as const;

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_NUMBER_RANGE_OPTIONS = [
  {
    value: "temperature",

    label: "Temperature",
  },
] as const;

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_OPTIONS = [
  "all",
  "hasError",
  "noError",
] as const;

export type KnowledgeObjectRelationGenerationErrorFilterType =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_OPTIONS)[number];

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_LABELS = {
  all: "전체",

  hasError: "에러 있음",

  noError: "에러 없음",
} satisfies Record<KnowledgeObjectRelationGenerationErrorFilterType, string>;

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_OPTIONS = [
  "all",
  ...Object.values(LLM_MODELS),
] as const;

export type KnowledgeObjectRelationGenerationModelFilterType =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_OPTIONS)[number];

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_LABELS = {
  all: "전체",

  "gpt-4o-mini": "GPT-4o Mini",
} satisfies Record<KnowledgeObjectRelationGenerationModelFilterType, string>;
