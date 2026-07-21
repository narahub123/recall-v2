import { Schema, model, models } from "mongoose";

export const KNOWLEDGE_RELATION_TYPES = [
  "comparison",
  "extension",
  "alternative",
  "criterion",
] as const;

export type KnowledgeRelationType = (typeof KNOWLEDGE_RELATION_TYPES)[number];

export interface IKnowledgeObjectRelation {
  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  relationType: KnowledgeRelationType;

  reason: string;

  confidence: number;

  createdAt: Date;

  updatedAt: Date;
}

const knowledgeObjectRelationSchema = new Schema<IKnowledgeObjectRelation>(
  {
    sourceKnowledgeObjectId: {
      type: String,
      required: true,
      index: true,
    },

    targetKnowledgeObjectId: {
      type: String,
      required: true,
      index: true,
    },

    relationType: {
      type: String,
      required: true,
      enum: KNOWLEDGE_RELATION_TYPES,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "knowledge_object_relations",
  },
);

knowledgeObjectRelationSchema.index({
  sourceKnowledgeObjectId: 1,
  targetKnowledgeObjectId: 1,
});

knowledgeObjectRelationSchema.index(
  {
    sourceKnowledgeObjectId: 1,

    targetKnowledgeObjectId: 1,

    relationType: 1,
  },
  {
    unique: true,
  },
);

export const KnowledgeObjectRelation =
  models.KnowledgeObjectRelation ||
  model<IKnowledgeObjectRelation>(
    "KnowledgeObjectRelation",
    knowledgeObjectRelationSchema,
  );
