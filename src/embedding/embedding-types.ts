export interface EmbeddingUsage {
  inputTokens: number;

  totalTokens: number;
}

export interface EmbeddingResponse {
  embeddings: number[][];

  usage: EmbeddingUsage;

  metadata: {
    model: string;
  };
}

export interface EmbeddingInput {
  texts: string[];

  model: string;
}
