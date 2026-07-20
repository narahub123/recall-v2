import type { LlmGenerateInput, LlmResponse } from "./llm-types";

export interface LlmClient {
  generate<T>(input: LlmGenerateInput): Promise<LlmResponse<T>>;
}
