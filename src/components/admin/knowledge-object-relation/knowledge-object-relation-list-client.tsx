"use client";

import { useState } from "react";

import { useKnowledgeObjectRelations } from "@/hooks/knowledge-object-relation/queries/use-knowledge-object-relations";

import { KnowledgeObjectRelationList } from "./knowledge-object-relation-list";

import { AdminPagination } from "@/components/admin/common/admin-pagination";

import {
  KNOWLEDGE_RELATION_BADGE_COLORS,
  KNOWLEDGE_RELATION_FILTER_OPTIONS,
  KNOWLEDGE_RELATION_TYPE_LABELS,
  KNOWLEDGE_RELATION_NUMBER_RANGE_OPTIONS,
  KNOWLEDGE_RELATION_DATE_RANGE_OPTIONS,
  type KnowledgeObjectRelationFilter,
} from "@/types/knowledge-object-relation/filter";

import {
  KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS,
  KNOWLEDGE_OBJECT_RELATION_SEARCH_LABELS,
  type KnowledgeObjectRelationSearch,
} from "@/types/knowledge-object-relation/search";

import { DateRangeValue, NumberRangeValue } from "@/types/filter";

import { AdminSearchInput } from "../common/admin-search-input";
import { AdminMultiSelect } from "../common/admin-multi-select";

import { NumberRangeInput } from "@/components/common/number-range-input";
import { DateRangeInput } from "@/components/common/date-range-input";

const DEFAULT_LIMIT = 20;

export function KnowledgeObjectRelationListClient() {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<KnowledgeObjectRelationFilter>({});

  const [search, setSearch] = useState<
    KnowledgeObjectRelationSearch | undefined
  >(undefined);

  const numberRange = filter.numberRanges?.[0] ?? {};

  const dateRange = filter.dateRanges?.[0] ?? {};

  const { data, isLoading } = useKnowledgeObjectRelations({
    page,

    limit: DEFAULT_LIMIT,

    filter,

    search,
  });

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-end gap-4">
        <div className="flex gap-4 flex-wrap">
          <AdminMultiSelect
            value={filter.relationTypes ?? []}
            options={KNOWLEDGE_RELATION_FILTER_OPTIONS}
            labels={KNOWLEDGE_RELATION_TYPE_LABELS}
            badgeColors={KNOWLEDGE_RELATION_BADGE_COLORS}
            placeholder="관계 유형"
            onChange={(relationTypes) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,
                relationTypes,
              }));
            }}
          />

          <NumberRangeInput
            value={numberRange}
            inputMin={0}
            inputMax={2}
            step={0.01}
            options={KNOWLEDGE_RELATION_NUMBER_RANGE_OPTIONS}
            onChange={(value: NumberRangeValue) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,
                numberRanges: [value],
              }));
            }}
          />

          <DateRangeInput
            value={dateRange}
            options={KNOWLEDGE_RELATION_DATE_RANGE_OPTIONS}
            onChange={(value: DateRangeValue) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,
                dateRanges: [value],
              }));
            }}
          />
        </div>

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
