import type { ListQuery } from "@/types/list-query";
import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import type { KnowledgeObjectRelationSearch } from "@/types/knowledge-object-relation/search";

export const knowledgeObjectRelationKeys = {
  all: ["knowledge-object-relations"] as const,

  lists: () => [...knowledgeObjectRelationKeys.all, "list"] as const,

  list: (
    query: ListQuery<
      KnowledgeObjectRelationFilter,
      KnowledgeObjectRelationSearch
    >,
  ) => [...knowledgeObjectRelationKeys.lists(), query] as const,

  detail: (id: string) =>
    [...knowledgeObjectRelationKeys.all, "detail", id] as const,

  byKnowledgeObject: (knowledgeObjectId: string) =>
    [
      ...knowledgeObjectRelationKeys.all,
      "knowledge-object",
      knowledgeObjectId,
    ] as const,
};
