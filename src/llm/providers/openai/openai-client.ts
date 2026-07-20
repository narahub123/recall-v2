import OpenAI from "openai";

import type { LlmClient } from "@/llm/llm-client";
import type { LlmGenerateInput, LlmResponse } from "@/llm/llm-types";

export class OpenAiClient implements LlmClient {
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate<T>(input: LlmGenerateInput): Promise<LlmResponse<T>> {
    const response = await this.client.chat.completions.create({
      model: input.model,

      temperature: input.temperature ?? 0,

      response_format:
        input.responseFormat === "json"
          ? {
              type: "json_object",
            }
          : undefined,

      messages: [
        {
          role: "user",

          content: input.prompt,
        },
      ],
    });

    const content = response.choices[0]?.message.content;

    if (!content) {
      throw new Error("LLM 응답이 없습니다.");
    }

    const result = JSON.parse(content) as T;

    return {
      result,

      usage: {
        inputTokens: response.usage?.prompt_tokens ?? 0,

        outputTokens: response.usage?.completion_tokens ?? 0,

        totalTokens: response.usage?.total_tokens ?? 0,
      },

      metadata: {
        model: response.model,

        temperature: input.temperature ?? 0,

        responseFormat: input.responseFormat ?? "text",
      },
    };
  }
}
