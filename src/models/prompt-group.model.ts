import { Schema, model, models } from "mongoose";

export interface IPromptGroup {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const promptGroupSchema = new Schema<IPromptGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "prompt_groups",
  },
);

export const PromptGroup =
  models.PromptGroup || model<IPromptGroup>("PromptGroup", promptGroupSchema);
