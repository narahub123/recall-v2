export interface LlmUsage {
  inputTokens: number;

  outputTokens: number;

  totalTokens: number;
}

export interface LlmResponse<T> {
  result: T;

  usage: LlmUsage;

  metadata: {
    model: string;

    temperature: number;

    responseFormat: string;
  };
}

export interface LlmGenerateInput {
  prompt: string;

  model: string;

  temperature?: number;

  responseFormat?: "json";
}
