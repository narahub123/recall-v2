"use client";

import { useState } from "react";

import { useKnowledgeObjectRelationGenerationsView } from "@/hooks/knowledge-object-relation-generation/queries/use-knowledge-object-relation-generations-view";

import { KnowledgeObjectRelationGenerationList } from "./knowledge-object-relation-generation-list";

import { AdminPagination } from "@/components/admin/common/admin-pagination";

import {
  KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_OPTIONS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_LABELS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_NUMBER_RANGE_OPTIONS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_DATE_RANGE_OPTIONS,
  type KnowledgeObjectRelationGenerationFilter,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_OPTIONS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_LABELS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_OPTIONS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_LABELS,
} from "@/types/knowledge-object-relation-generation/filter";

import { DateRangeValue, NumberRangeValue } from "@/types/filter";

import { AdminMultiSelect } from "../common/admin-multi-select";

import { NumberRangeInput } from "@/components/common/number-range-input";

import { DateRangeInput } from "@/components/common/date-range-input";
import { FilterSelect } from "@/components/common/filter-select";
import { SearchInput } from "@/components/common/search-input";
import {
  KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_FIELDS,
  KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_LABELS,
  KnowledgeObjectRelationGenerationSearch,
} from "@/types/knowledge-object-relation-generation/search";

const DEFAULT_LIMIT = 20;

export function KnowledgeObjectRelationGenerationListClient() {
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<KnowledgeObjectRelationGenerationFilter>(
    {},
  );

  const [search, setSearch] = useState<
    KnowledgeObjectRelationGenerationSearch | undefined
  >(undefined);

  const numberRange = filter.numberRanges?.[0] ?? {};

  const dateRange = filter.dateRanges?.[0] ?? {};

  const { data, isLoading } = useKnowledgeObjectRelationGenerationsView({
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
            value={filter.statuses ?? []}
            options={KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_OPTIONS}
            labels={KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS_LABELS}
            placeholder="상태"
            onChange={(statuses) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,

                statuses,
              }));
            }}
          />

          <AdminMultiSelect
            value={filter.models ?? []}
            options={KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_OPTIONS}
            labels={KNOWLEDGE_OBJECT_RELATION_GENERATION_MODEL_LABELS}
            placeholder="모델"
            onChange={(models) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,

                models,
              }));
            }}
          />
          <FilterSelect
            value={filter.errorStatus}
            options={KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_OPTIONS}
            labels={KNOWLEDGE_OBJECT_RELATION_GENERATION_ERROR_LABELS}
            placeholder="에러 여부"
            onChange={(errorStatus) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,

                errorStatus,
              }));
            }}
          />

          <NumberRangeInput
            value={numberRange}
            options={KNOWLEDGE_OBJECT_RELATION_GENERATION_NUMBER_RANGE_OPTIONS}
            inputMin={0}
            inputMax={2}
            step={0.01}
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
            options={KNOWLEDGE_OBJECT_RELATION_GENERATION_DATE_RANGE_OPTIONS}
            onChange={(value: DateRangeValue) => {
              setPage(1);

              setFilter((prev) => ({
                ...prev,

                dateRanges: [value],
              }));
            }}
          />
        </div>

        <SearchInput
          fields={KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_FIELDS}
          labels={KNOWLEDGE_OBJECT_RELATION_GENERATION_SEARCH_LABELS}
          value={search}
          onChange={(value) => {
            setPage(1);

            setSearch(value);
          }}
        />
      </div>

      <KnowledgeObjectRelationGenerationList generations={data?.items ?? []} />

      {data?.pagination && (
        <AdminPagination pagination={data.pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
