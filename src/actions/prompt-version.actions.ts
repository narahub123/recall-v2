"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth/auth-user";

import { PromptVersionRepository } from "@/repositories/prompt-version.repository";
import { PromptVersionService } from "@/services/prompt-version.service";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";
import { PromptGroupService } from "@/services/prompt-group.service";
import { PromptVersionDetailDTO } from "@/dto/prompt-version-detail.dto";
import { requireAdmin } from "@/lib/auth/require-admin";
import { PromptVersionDetailMapper } from "@/mappers/prompt-version-detail.mapper";

const promptVersionService = new PromptVersionService(
  new PromptVersionRepository(),
);

const promptGroupService = new PromptGroupService(
  new PromptGroupRepository(),
  promptVersionService,
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

export async function getPromptVersionDetailAction(
  id: string,
): Promise<PromptVersionDetailDTO | null> {
  await connectMongoDB();

  await requireAdmin();

  const version = await promptVersionService.getVersionById(id);

  if (!version) {
    return null;
  }

  const promptGroup = await promptGroupService.getPromptGroupById(
    version.promptGroupId,
  );

  if (!promptGroup) {
    return null;
  }

  return PromptVersionDetailMapper.toDTO(version, promptGroup);
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
