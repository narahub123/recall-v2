"use client";

import { useState } from "react";

import { useKnowledgeObjectRelations } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relations";

import { KnowledgeObjectRelationList } from "./knowledge-object-relation-list";

import { AdminPagination } from "@/components/admin/common/admin-pagination";

import {
  KNOWLEDGE_RELATION_FILTER_OPTIONS,
  KNOWLEDGE_RELATION_TYPE_LABELS,
  type KnowledgeObjectRelationFilter,
} from "@/types/knowledge-object-relation/filter";
import {
  KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS,
  KNOWLEDGE_OBJECT_RELATION_SEARCH_LABELS,
  type KnowledgeObjectRelationSearch,
} from "@/types/knowledge-object-relation/search";

import { AdminSearchInput } from "../common/admin-search-input";
import { AdminFilterSelect } from "../common/admin-filter-select";
import { KNOWLEDGE_RELATION_TYPES } from "@/constants/knowledge-object-relation";

const DEFAULT_LIMIT = 20;

export function KnowledgeObjectRelationListClient() {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<KnowledgeObjectRelationFilter>({});

  const [search, setSearch] = useState<
    KnowledgeObjectRelationSearch | undefined
  >(undefined);

  const { data, isLoading } = useKnowledgeObjectRelations({
    page,

    limit: DEFAULT_LIMIT,

    filter,

    search,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 flex flex-col items-end">
        <AdminFilterSelect
          value={filter.relationType}
          options={KNOWLEDGE_RELATION_FILTER_OPTIONS}
          labels={KNOWLEDGE_RELATION_TYPE_LABELS}
          placeholder="관계 유형"
          onChange={(relationType) => {
            setPage(1);

            setFilter({
              relationType,
            });
          }}
        />

        <AdminSearchInput
          fields={KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS}
          labels={KNOWLEDGE_OBJECT_RELATION_SEARCH_LABELS}
          value={search}
          onChange={(value) => {
            setPage(1);

            setSearch(value);
          }}
        />
      </div>

      <KnowledgeObjectRelationList relations={data?.items ?? []} />

      {data?.pagination && (
        <AdminPagination pagination={data.pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
