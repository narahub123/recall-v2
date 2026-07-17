import { Schema, model, models } from "mongoose";

export interface IUser {
  name?: string | null;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

export const User = models.User || model<IUser>("User", userSchema);
