"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";

import { PromptGroupRepository } from "@/repositories/prompt-group.repository";
import { PromptGroupService } from "@/services/prompt-group.service";

const promptGroupService = new PromptGroupService(new PromptGroupRepository());

export async function createPromptGroupAction(data: {
  key: string;
  name: string;
  description?: string;
}) {
  await connectMongoDB();

  await requireAdmin();

  return promptGroupService.createPromptGroup(data);
}

export async function getPromptGroupsAction() {
  await connectMongoDB();

  await requireAdmin();

  return promptGroupService.getPromptGroups();
}

export async function getPromptGroupAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return promptGroupService.getPromptGroupById(id);
}

export async function updatePromptGroupAction(
  id: string,
  data: {
    name?: string;
    description?: string;
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return promptGroupService.updatePromptGroup(id, data);
}

export async function deletePromptGroupAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return promptGroupService.deletePromptGroup(id);
}
