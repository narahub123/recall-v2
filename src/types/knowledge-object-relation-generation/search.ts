export const KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_FIELDS = [
  "knowledgeObjectName",

  "promptGroupName",
] as const;

export type KnowledgeObjectRelationGenerationSearchField =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_FIELDS)[number];

export interface KnowledgeObjectRelationGenerationSearch {
  field: KnowledgeObjectRelationGenerationSearchField;

  keyword: string;
}

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_LABELS = {
  knowledgeObjectName: "지식 객체",

  promptGroupName: "프롬프트",
} satisfies Record<KnowledgeObjectRelationGenerationSearchField, string>;
