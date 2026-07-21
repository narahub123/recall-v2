"use client";

import { useState } from "react";

import { useKnowledgeObjectRelations } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relations";

import { KnowledgeObjectRelationList } from "./knowledge-object-relation-list";

import { AdminPagination } from "@/components/admin/common/admin-pagination";

import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import { KnowledgeObjectRelationFilterSelect } from "./knowledge-object-relation-filter-select";

const DEFAULT_LIMIT = 20;

export function KnowledgeObjectRelationListClient() {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<KnowledgeObjectRelationFilter>({});

  const { data, isLoading } = useKnowledgeObjectRelations({
    page,

    limit: DEFAULT_LIMIT,

    filter,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <KnowledgeObjectRelationFilterSelect
        value={filter.relationType}
        onChange={(relationType) => {
          setPage(1);

          setFilter({
            relationType,
          });
        }}
      />
      <KnowledgeObjectRelationList relations={data?.items ?? []} />

      {data?.pagination && (
        <AdminPagination pagination={data.pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
