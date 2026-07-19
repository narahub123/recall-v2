import { Schema, model, models } from "mongoose";
import { USER_ROLE, UserRole } from "../constants/user";

export interface IUser {
  name?: string | null;
  email: string;
  image?: string | null;
  role: UserRole;
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
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  },
);

export const User = models.User || model<IUser>("User", userSchema);
