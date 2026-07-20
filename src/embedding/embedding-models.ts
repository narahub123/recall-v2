export const EMBEDDING_MODELS = {
  TEXT_EMBEDDING_3_SMALL: "text-embedding-3-small",

  TEXT_EMBEDDING_3_LARGE: "text-embedding-3-large",
} as const;

export type EmbeddingModel =
  (typeof EMBEDDING_MODELS)[keyof typeof EMBEDDING_MODELS];
