export const knowledgeExtractionKeys = {
  all: ["knowledge-extractions"] as const,

  lists: () => [...knowledgeExtractionKeys.all, "list"] as const,

  list: () => [...knowledgeExtractionKeys.lists()] as const,

  detail: (id: string) =>
    [...knowledgeExtractionKeys.all, "detail", id] as const,
};
