import type { EmbeddingInput, EmbeddingResponse } from "./embedding-types";

export interface EmbeddingClient {
  embed(input: EmbeddingInput): Promise<EmbeddingResponse>;
}
