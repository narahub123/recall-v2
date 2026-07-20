export const noteRelationKeys = {
  all: ["note-relations"] as const,

  lists: () => [...noteRelationKeys.all, "list"] as const,

  list: () => [...noteRelationKeys.lists()] as const,

  detail: (id: string) => [...noteRelationKeys.all, "detail", id] as const,

  byNote: (noteId: string) =>
    [...noteRelationKeys.all, "note", noteId] as const,
};
