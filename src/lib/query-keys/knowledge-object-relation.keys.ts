export const knowledgeObjectRelationKeys = {
  all: ["knowledge-object-relations"] as const,

  lists: () => [...knowledgeObjectRelationKeys.all, "list"] as const,

  list: () => [...knowledgeObjectRelationKeys.lists()] as const,

  detail: (id: string) =>
    [...knowledgeObjectRelationKeys.all, "detail", id] as const,

  byKnowledgeObject: (knowledgeObjectId: string) =>
    [
      ...knowledgeObjectRelationKeys.all,
      "knowledge-object",
      knowledgeObjectId,
    ] as const,
};
