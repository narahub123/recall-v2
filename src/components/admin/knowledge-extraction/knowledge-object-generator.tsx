"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EmbeddingModelSelect } from "@/components/embedding/embedding-model-select";

import {
  EMBEDDING_MODELS,
  type EmbeddingModel,
} from "@/embedding/embedding-models";

import { useCreateKnowledgeObjectsFromExtraction } from "@/hooks/knowledge-object/mutations/use-create-knowledge-objects-from-extraction";

interface Props {
  extractionId: string;
}

export function KnowledgeObjectGenerator({ extractionId }: Props) {
  const router = useRouter();

  const [embeddingModel, setEmbeddingModel] = useState<EmbeddingModel>(
    EMBEDDING_MODELS.TEXT_EMBEDDING_3_SMALL,
  );

  const mutation = useCreateKnowledgeObjectsFromExtraction();

  function handleCreate() {
    mutation.mutate(
      {
        extractionId,

        embeddingModel,
      },
      {
        onSuccess() {
          router.push("/admin/knowledge-objects");
        },
      },
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Knowledge Object Generation</h2>

      <div className="flex items-center gap-4">
        <EmbeddingModelSelect
          value={embeddingModel}
          onChange={setEmbeddingModel}
        />

        <Button onClick={handleCreate} disabled={mutation.isPending}>
          {mutation.isPending ? "생성 중..." : "Knowledge Object 생성"}
        </Button>
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          Knowledge Object 생성에 실패했습니다.
        </p>
      )}
    </section>
  );
}
