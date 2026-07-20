import OpenAI from "openai";

import type { EmbeddingClient } from "@/embedding/embedding-client";
import type {
  EmbeddingInput,
  EmbeddingResponse,
} from "@/embedding/embedding-types";

export class OpenAiEmbeddingClient implements EmbeddingClient {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async embed(input: EmbeddingInput): Promise<EmbeddingResponse> {
    const response = await this.client.embeddings.create({
      model: input.model,

      input: input.texts,
    });

    return {
      embeddings: response.data.map((item) => item.embedding),

      usage: {
        inputTokens: response.usage?.prompt_tokens ?? 0,

        totalTokens: response.usage?.total_tokens ?? 0,
      },

      metadata: {
        model: response.model,
      },
    };
  }
}
