export interface KnowledgeObjectRelationGenerationDTO {
  id: string;

  knowledgeObjectId: string;

  promptVersionId: string;

  promptSnapshot: string;

  model: string;

  temperature: number;

  responseFormat: string;

  candidateKnowledgeObjectIds: string[];

  results: {
    sourceKnowledgeObjectId: string;

    targetKnowledgeObjectId: string;

    related: boolean;

    relationType?: string | null;

    reason?: string | null;

    confidence?: number | null;
  }[];

  usage: {
    inputTokens: number;

    outputTokens: number;

    totalTokens: number;
  };

  status: string;

  errorMessage?: string | null;

  createdAt: string;

  updatedAt: string;
}
