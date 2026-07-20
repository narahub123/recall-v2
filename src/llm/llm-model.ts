export const LLM_MODELS = {
  GPT_4O_MINI: "gpt-4o-mini",
} as const;

export type LlmModel = (typeof LLM_MODELS)[keyof typeof LLM_MODELS];
