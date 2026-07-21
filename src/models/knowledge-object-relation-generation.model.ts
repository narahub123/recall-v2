import { Schema, Types, model, models } from "mongoose";

export const KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS = {
  PROCESSING: "PROCESSING",

  COMPLETED: "COMPLETED",

  FAILED: "FAILED",
} as const;

export type KnowledgeObjectRelationGenerationStatus =
  (typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS)[keyof typeof KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS];

export interface IKnowledgeObjectRelationGenerationResult {
  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  related: boolean;

  relationType?: string | null;

  reason?: string | null;

  confidence?: number | null;
}

export interface IKnowledgeObjectRelationGeneration {
  _id: Types.ObjectId;

  knowledgeObjectId: string;

  promptVersionId: string;

  promptSnapshot: string;

  model: string;

  temperature: number;

  responseFormat: string;

  candidateKnowledgeObjectIds: string[];

  results: IKnowledgeObjectRelationGenerationResult[];

  usage: {
    inputTokens: number;

    outputTokens: number;

    totalTokens: number;
  };

  status: KnowledgeObjectRelationGenerationStatus;

  errorMessage?: string | null;

  createdAt: Date;

  updatedAt: Date;
}

const knowledgeObjectRelationGenerationResultSchema =
  new Schema<IKnowledgeObjectRelationGenerationResult>(
    {
      sourceKnowledgeObjectId: {
        type: String,

        required: true,
      },

      targetKnowledgeObjectId: {
        type: String,

        required: true,
      },

      related: {
        type: Boolean,

        required: true,
      },

      relationType: {
        type: String,

        default: null,
      },

      reason: {
        type: String,

        default: null,
      },

      confidence: {
        type: Number,

        default: null,
      },
    },
    {
      _id: false,
    },
  );

const knowledgeObjectRelationGenerationSchema =
  new Schema<IKnowledgeObjectRelationGeneration>(
    {
      knowledgeObjectId: {
        type: String,

        required: true,

        index: true,
      },

      promptVersionId: {
        type: String,

        required: true,

        index: true,
      },

      promptSnapshot: {
        type: String,

        required: true,
      },

      model: {
        type: String,

        required: true,
      },

      temperature: {
        type: Number,

        required: true,
      },

      responseFormat: {
        type: String,

        required: true,
      },

      candidateKnowledgeObjectIds: {
        type: [String],

        required: true,

        default: [],
      },

      results: {
        type: [knowledgeObjectRelationGenerationResultSchema],

        required: true,

        default: [],
      },

      usage: {
        inputTokens: {
          type: Number,

          required: true,

          default: 0,
        },

        outputTokens: {
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

        default: KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.PROCESSING,
      },

      errorMessage: {
        type: String,

        default: null,
      },
    },
    {
      timestamps: true,

      versionKey: false,

      collection: "knowledge_object_relation_generations",
    },
  );

knowledgeObjectRelationGenerationSchema.index({
  knowledgeObjectId: 1,

  promptVersionId: 1,
});

export const KnowledgeObjectRelationGeneration =
  models.KnowledgeObjectRelationGeneration ||
  model<IKnowledgeObjectRelationGeneration>(
    "KnowledgeObjectRelationGeneration",
    knowledgeObjectRelationGenerationSchema,
  );
