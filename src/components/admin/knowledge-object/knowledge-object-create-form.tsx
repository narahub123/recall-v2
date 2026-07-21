"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { EmbeddingModelSelect } from "@/components/embedding/embedding-model-select";

import { EMBEDDING_MODELS, EmbeddingModel } from "@/embedding/embedding-models";

import { useCreateKnowledgeObjectsFromExtraction } from "@/hooks/knowledge-object/mutations/use-create-knowledge-objects-from-extraction";
import { KnowledgeExtractionSelect } from "../knowledge-extraction/knowledge-extraction-select";
import { ROUTES } from "@/constants/routes";

export function KnowledgeObjectCreateForm() {
  const router = useRouter();

  const [extractionId, setExtractionId] = useState("");

  const [embeddingModel, setEmbeddingModel] = useState<EmbeddingModel>(
    EMBEDDING_MODELS.TEXT_EMBEDDING_3_SMALL,
  );

  const mutation = useCreateKnowledgeObjectsFromExtraction();

  function handleSubmit() {
    if (!extractionId) {
      return;
    }

    mutation.mutate(
      {
        extractionId,

        embeddingModel,
      },
      {
        onSuccess(objects) {
          if (!objects.length) {
            return;
          }

          router.push(ROUTES.ADMIN.KNOWLEDGE_OBJECT_GENERATIONS);
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Knowledge Extraction</label>

        <KnowledgeExtractionSelect
          value={extractionId}
          onChange={setExtractionId}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Embedding Model</label>

        <EmbeddingModelSelect
          value={embeddingModel}
          onChange={setEmbeddingModel}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={mutation.isPending || !extractionId}
      >
        {mutation.isPending ? "생성 중..." : "Knowledge Object 생성"}
      </Button>
    </div>
  );
}
