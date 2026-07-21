export const KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS = [
  "sourceKnowledgeObjectName",
  "targetKnowledgeObjectName",
] as const;

export type KnowledgeObjectRelationSearchField =
  (typeof KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS)[number];

export interface KnowledgeObjectRelationSearch {
  field: KnowledgeObjectRelationSearchField;

  keyword: string;
}

export const KNOWLEDGE_OBJECT_RELATION_SEARCH_LABELS = {
  sourceKnowledgeObjectName: "소스 지식 객체",
  targetKnowledgeObjectName: "타겟 지식 객체",
} satisfies Record<KnowledgeObjectRelationSearchField, string>;
