import { EmbeddingModel } from "@/embedding/embedding-models";
import { Schema, model, models } from "mongoose";

export interface IKnowledgeObject {
  noteId: string;

  extractionId?: string;

  promptVersionId: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  embeddingText: string;

  embeddingModel: EmbeddingModel;

  embedding: number[];

  createdAt: Date;

  updatedAt: Date;
}

const knowledgeObjectSchema = new Schema<IKnowledgeObject>(
  {
    noteId: {
      type: String,
      required: true,
      index: true,
    },

    extractionId: {
      type: String,
      index: true,
    },

    promptVersionId: {
      type: String,
      required: true,
      index: true,
    },

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

    embeddingText: {
      type: String,
      required: true,
    },

    embeddingModel: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "knowledge_objects",
  },
);

knowledgeObjectSchema.index({
  noteId: 1,
  extractionId: 1,
});

knowledgeObjectSchema.index({
  name: "text",
  description: "text",
});

export const KnowledgeObject =
  models.KnowledgeObject ||
  model<IKnowledgeObject>("KnowledgeObject", knowledgeObjectSchema);
