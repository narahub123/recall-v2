export const knowledgeObjectGenerationKeys = {
  all: ["knowledge-object-generations"] as const,

  lists: () => [...knowledgeObjectGenerationKeys.all, "list"] as const,

  list: () => [...knowledgeObjectGenerationKeys.lists()] as const,

  detail: (id: string) =>
    [...knowledgeObjectGenerationKeys.all, "detail", id] as const,
};
