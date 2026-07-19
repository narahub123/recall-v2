import { Schema, model, models, Types } from "mongoose";

export interface IPromptVersion {
  promptGroupId: Types.ObjectId;
  version: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const promptVersionSchema = new Schema<IPromptVersion>(
  {
    promptGroupId: {
      type: Schema.Types.ObjectId,
      ref: "PromptGroup",
      required: true,
    },

    version: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "prompt_versions",
  },
);

promptVersionSchema.index(
  {
    promptGroupId: 1,
    version: 1,
  },
  {
    unique: true,
  },
);

export const PromptVersion =
  models.PromptVersion ||
  model<IPromptVersion>("PromptVersion", promptVersionSchema);
