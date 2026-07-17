import { Schema, model, models, Types } from "mongoose";

const noteSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: [Schema.Types.Mixed],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = models.Note || model("Note", noteSchema);
