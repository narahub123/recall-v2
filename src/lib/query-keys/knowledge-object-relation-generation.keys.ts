import { KnowledgeObjectRelationGenerationFilter } from "@/types/knowledge-object-relation-generation/filter";
import { KnowledgeObjectRelationGenerationSearch } from "@/types/knowledge-object-relation-generation/search";
import { ListQuery } from "@/types/list-query";

export const knowledgeObjectRelationGenerationKeys = {
  all: ["knowledge-object-relation-generations"] as const,

  lists: () => [...knowledgeObjectRelationGenerationKeys.all, "list"] as const,

  list: () => [...knowledgeObjectRelationGenerationKeys.lists()] as const,

  details: () =>
    [...knowledgeObjectRelationGenerationKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...knowledgeObjectRelationGenerationKeys.details(), id] as const,

  views: () => [...knowledgeObjectRelationGenerationKeys.all, "view"] as const,

  view: (id: string) =>
    [...knowledgeObjectRelationGenerationKeys.views(), id] as const,

  viewList: (
    query: ListQuery<
      KnowledgeObjectRelationGenerationFilter,
      KnowledgeObjectRelationGenerationSearch
    >,
  ) =>
    [...knowledgeObjectRelationGenerationKeys.views(), "list", query] as const,

  byKnowledgeObject: (knowledgeObjectId: string) =>
    [
      ...knowledgeObjectRelationGenerationKeys.all,
      "knowledge-object",
      knowledgeObjectId,
    ] as const,

  byPromptVersion: (promptVersionId: string) =>
    [
      ...knowledgeObjectRelationGenerationKeys.all,
      "prompt-version",
      promptVersionId,
    ] as const,
};
