export interface KnowledgeExtractionDTO {
  id: string;

  noteId: string;

  promptVersionId: string;

  model: string;

  temperature: number;

  responseFormat: string;

  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };

  createdAt: string;

  updatedAt: string;
}
