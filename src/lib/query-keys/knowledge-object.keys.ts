export const knowledgeObjectKeys = {
  all: ["knowledge-objects"] as const,

  lists: () => [...knowledgeObjectKeys.all, "list"] as const,

  list: () => [...knowledgeObjectKeys.lists()] as const,

  detail: (id: string) => [...knowledgeObjectKeys.all, "detail", id] as const,

  byNote: (noteId: string) =>
    [...knowledgeObjectKeys.all, "by-note", noteId] as const,

  byExtraction: (extractionId: string) =>
    [...knowledgeObjectKeys.all, "by-extraction", extractionId] as const,

  views: () => [...knowledgeObjectKeys.all, "view"] as const,

  viewList: () => [...knowledgeObjectKeys.views(), "list"] as const,

  viewDetail: (id: string) =>
    [...knowledgeObjectKeys.views(), "detail", id] as const,
};
