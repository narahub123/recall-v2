import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import type { ListQuery } from "@/types/pagination";

export const knowledgeObjectRelationKeys = {
  all: ["knowledge-object-relations"] as const,

  lists: () => [...knowledgeObjectRelationKeys.all, "list"] as const,

  list: (query: ListQuery<KnowledgeObjectRelationFilter>) =>
    [...knowledgeObjectRelationKeys.lists(), query] as const,

  detail: (id: string) =>
    [...knowledgeObjectRelationKeys.all, "detail", id] as const,

  byKnowledgeObject: (knowledgeObjectId: string) =>
    [
      ...knowledgeObjectRelationKeys.all,
      "knowledge-object",
      knowledgeObjectId,
    ] as const,
};
