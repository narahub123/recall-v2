"use client";

import { useState } from "react";

import { useKnowledgeObjectRelationGenerationsView } from "@/hooks/knowledge-object-relation-generation/queries/use-knowledge-object-relation-generations-view";

import { KnowledgeObjectRelationGenerationList } from "./knowledge-object-relation-generation-list";

import { Pagination } from "@/components/common/pagination";

const DEFAULT_LIMIT = 1;

export function KnowledgeObjectRelationGenerationListClient() {
  const [page, setPage] = useState(1);

  console.log("page", page);

  const { data, isLoading } = useKnowledgeObjectRelationGenerationsView({
    page,

    limit: DEFAULT_LIMIT,
  });

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <KnowledgeObjectRelationGenerationList generations={data?.items ?? []} />

      {data?.pagination && (
        <Pagination pagination={data.pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
