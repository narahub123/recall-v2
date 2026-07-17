"use server";

import { connectMongoDB } from "@/lib/mongodb";

export async function checkDatabaseConnection() {
  try {
    await connectMongoDB();

    return {
      success: true,
      message: "MongoDB connected",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "MongoDB connection failed",
    };
  }
}
