export const noteKeys = {
  all: ["notes"] as const,

  lists: () => [...noteKeys.all, "list"] as const,

  detail: (id: string) => [...noteKeys.all, "detail", id] as const,
};
