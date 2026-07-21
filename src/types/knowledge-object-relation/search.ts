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
