export const promptGroupKeys = {
  all: ["prompt-groups"] as const,

  lists: () => [...promptGroupKeys.all, "list"] as const,

  detail: (id: string) => [...promptGroupKeys.all, "detail", id] as const,
};
