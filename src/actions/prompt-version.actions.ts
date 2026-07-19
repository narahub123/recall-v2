"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth/auth-user";

import { PromptVersionRepository } from "@/repositories/prompt-version.repository";
import { PromptVersionService } from "@/services/prompt-version.service";

const promptVersionService = new PromptVersionService(
  new PromptVersionRepository(),
);

export async function createPromptVersionAction(data: {
  promptGroupId: string;
  content: string;
}) {
  await connectMongoDB();

  await getCurrentUser();

  return promptVersionService.createVersion(data);
}

export async function getPromptVersionAction(id: string) {
  await connectMongoDB();

  await getCurrentUser();

  return promptVersionService.getVersionById(id);
}

export async function getPromptVersionsAction(promptGroupId: string) {
  await connectMongoDB();

  await getCurrentUser();

  return promptVersionService.getVersionsByPromptGroupId(promptGroupId);
}

export async function updatePromptVersionAction(
  id: string,
  data: {
    content?: string;
  },
) {
  await connectMongoDB();

  await getCurrentUser();

  return promptVersionService.updateVersion(id, data);
}

export async function deletePromptVersionAction(id: string) {
  await connectMongoDB();

  await getCurrentUser();

  return promptVersionService.deleteVersion(id);
}
