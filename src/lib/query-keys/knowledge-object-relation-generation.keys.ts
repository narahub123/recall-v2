export const knowledgeObjectRelationGenerationKeys = {
  all: ["knowledge-object-relation-generations"] as const,

  lists: () => [...knowledgeObjectRelationGenerationKeys.all, "list"] as const,

  list: () => [...knowledgeObjectRelationGenerationKeys.lists()] as const,

  detail: (id: string) =>
    [...knowledgeObjectRelationGenerationKeys.all, "detail", id] as const,

  byKnowledgeObject: (knowledgeObjectId: string) =>
    [
      ...knowledgeObjectRelationGenerationKeys.all,
      "knowledge-object",
      knowledgeObjectId,
    ] as const,
};
