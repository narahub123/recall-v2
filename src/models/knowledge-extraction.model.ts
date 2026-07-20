import { Schema, Types, model, models } from "mongoose";

export interface IKnowledgeExtractionUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface IKnowledgeExtractionObject {
  name: string;
  description: string;
  reason: string;
  parent?: string | null;
}

export interface IKnowledgeExtractionResult {
  knowledge_objects: IKnowledgeExtractionObject[];
}

export interface IKnowledgeExtraction {
  _id: Types.ObjectId;

  noteId: string;

  promptVersionId: string;

  promptSnapshot: string;

  model: string;

  temperature: number;

  responseFormat: string;

  result: IKnowledgeExtractionResult;

  usage: IKnowledgeExtractionUsage;

  createdAt: Date;

  updatedAt: Date;
}

const knowledgeExtractionObjectSchema = new Schema<IKnowledgeExtractionObject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    parent: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  },
);

const knowledgeExtractionResultSchema = new Schema<IKnowledgeExtractionResult>(
  {
    knowledge_objects: {
      type: [knowledgeExtractionObjectSchema],
      required: true,
    },
  },
  {
    _id: false,
  },
);

const knowledgeExtractionUsageSchema = new Schema<IKnowledgeExtractionUsage>(
  {
    inputTokens: {
      type: Number,
      required: true,
    },

    outputTokens: {
      type: Number,
      required: true,
    },

    totalTokens: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const knowledgeExtractionSchema = new Schema<IKnowledgeExtraction>(
  {
    noteId: {
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

    result: {
      type: knowledgeExtractionResultSchema,
      required: true,
    },

    usage: {
      type: knowledgeExtractionUsageSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "knowledge_extractions",
  },
);

knowledgeExtractionSchema.index({
  noteId: 1,
  promptVersionId: 1,
});

export const KnowledgeExtraction =
  models.KnowledgeExtraction ||
  model<IKnowledgeExtraction>("KnowledgeExtraction", knowledgeExtractionSchema);
