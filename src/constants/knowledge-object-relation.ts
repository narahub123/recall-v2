export const KNOWLEDGE_RELATION_TYPES = [
  "comparison",
  "extension",
  "alternative",
  "criterion",
] as const;

export type KnowledgeRelationType = (typeof KNOWLEDGE_RELATION_TYPES)[number];
