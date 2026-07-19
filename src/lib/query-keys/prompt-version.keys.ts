export const promptVersionKeys = {
  all: ["prompt-versions"] as const,

  lists: () => [...promptVersionKeys.all, "list"] as const,

  list: (promptGroupId: string) =>
    [...promptVersionKeys.lists(), promptGroupId] as const,

  detail: (id: string) => [...promptVersionKeys.all, "detail", id] as const,

  detailView: (id: string) =>
    [...promptVersionKeys.all, "detail-view", id] as const,
};
