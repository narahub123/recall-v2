import { EmbeddingModel } from "@/embedding/embedding-models";
import { Schema, Types, model, models } from "mongoose";

export const KNOWLEDGE_OBJECT_GENERATION_STATUS = {
  PROCESSING: "PROCESSING",

  COMPLETED: "COMPLETED",

  FAILED: "FAILED",
} as const;

export type KnowledgeObjectGenerationStatus =
  (typeof KNOWLEDGE_OBJECT_GENERATION_STATUS)[keyof typeof KNOWLEDGE_OBJECT_GENERATION_STATUS];

export interface IKnowledgeObjectGeneration {
  _id: Types.ObjectId;

  noteId: string;

  extractionId: string;

  promptVersionId: string;

  embeddingModel: EmbeddingModel;

  knowledgeObjectIds: string[];

  usage: {
    inputTokens: number;

    totalTokens: number;
  };

  status: KnowledgeObjectGenerationStatus;

  errorMessage?: string | null;

  createdAt: Date;

  updatedAt: Date;
}

const knowledgeObjectGenerationSchema = new Schema<IKnowledgeObjectGeneration>(
  {
    noteId: {
      type: String,

      required: true,

      index: true,
    },

    extractionId: {
      type: String,

      required: true,

      index: true,
    },

    promptVersionId: {
      type: String,

      required: true,

      index: true,
    },

    embeddingModel: {
      type: String,

      required: true,
    },

    knowledgeObjectIds: {
      type: [String],

      required: true,

      default: [],
    },

    usage: {
      inputTokens: {
        type: Number,

        required: true,

        default: 0,
      },

      totalTokens: {
        type: Number,

        required: true,

        default: 0,
      },
    },

    status: {
      type: String,

      required: true,

      default: KNOWLEDGE_OBJECT_GENERATION_STATUS.PROCESSING,
    },

    errorMessage: {
      type: String,

      default: null,
    },
  },
  {
    timestamps: true,

    versionKey: false,

    collection: "knowledge_object_generations",
  },
);

knowledgeObjectGenerationSchema.index({
  noteId: 1,
  extractionId: 1,
});

export const KnowledgeObjectGeneration =
  models.KnowledgeObjectGeneration ||
  model<IKnowledgeObjectGeneration>(
    "KnowledgeObjectGeneration",
    knowledgeObjectGenerationSchema,
  );
