import type { EmbeddingModel } from "@/embedding/embedding-models";

export interface KnowledgeObjectDTO {
  id: string;

  noteId: string;

  extractionId?: string;

  promptVersionId: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  embeddingText: string;

  embeddingModel: EmbeddingModel;

  embedding: number[];

  createdAt: string;

  updatedAt: string;
}
