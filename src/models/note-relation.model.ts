import { Schema, model, models } from "mongoose";

export interface INoteRelation {
  sourceNoteId: string;

  targetNoteId: string;

  relationType: string;

  reason: string;

  confidence: number;

  createdAt: Date;

  updatedAt: Date;
}

const noteRelationSchema = new Schema<INoteRelation>(
  {
    sourceNoteId: {
      type: String,
      required: true,
      index: true,
    },

    targetNoteId: {
      type: String,
      required: true,
      index: true,
    },

    relationType: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "note_relations",
  },
);

noteRelationSchema.index(
  {
    sourceNoteId: 1,

    targetNoteId: 1,

    relationType: 1,
  },
  {
    unique: true,
  },
);

export const NoteRelation =
  models.NoteRelation ||
  model<INoteRelation>("NoteRelation", noteRelationSchema);
