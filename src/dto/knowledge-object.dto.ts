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

  embedding: number[];

  createdAt: string;

  updatedAt: string;
}
