import type { EmbeddingModel } from "@/embedding/embedding-models";

import type { KnowledgeObjectGenerationStatus } from "@/models/knowledge-object-generation.model";

export interface KnowledgeObjectGenerationDTO {
  id: string;

  noteId: string;

  extractionId: string;

  promptVersionId: string;

  embeddingModel: EmbeddingModel;

  knowledgeObjectIds: string[];

  usage: {
    inputTokens: number;

    totalTokens: number;
  };

  status: KnowledgeObjectGenerationStatus;

  errorMessage?: string | null;

  createdAt: string;

  updatedAt: string;
}
