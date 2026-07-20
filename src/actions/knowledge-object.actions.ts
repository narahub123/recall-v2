"use server";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongoDB } from "@/lib/mongodb";
import { KnowledgeObjectRelationRepository } from "@/repositories/knowledge-object-relation.repository";

import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";
import { KnowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";
import { KnowledgeObjectService } from "@/services/knowledge-object.service";

const knowledgeObjectService = new KnowledgeObjectService(
  new KnowledgeObjectRepository(),
);

const knowledgeObjectRelationService = new KnowledgeObjectRelationService(
  new KnowledgeObjectRelationRepository(),
);

export async function createKnowledgeObjectAction(data: {
  noteId: string;

  extractionId?: string;

  promptVersionId: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  embeddingText: string;

  embedding: number[];
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.createKnowledgeObject(data);
}

export async function getKnowledgeObjectAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectById(id);
}

export async function getKnowledgeObjectsAction() {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjects();
}

export async function getKnowledgeObjectsByNoteIdAction(noteId: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectsByNoteId(noteId);
}

export async function getKnowledgeObjectsByExtractionIdAction(
  extractionId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectsByExtractionId(extractionId);
}

export async function updateKnowledgeObjectAction(
  id: string,
  data: {
    name?: string;

    description?: string;

    reason?: string;

    parent?: string | null;

    embeddingText?: string;
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.updateKnowledgeObject(id, data);
}

export async function deleteKnowledgeObjectAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  const deleted = await knowledgeObjectService.deleteKnowledgeObject(id);

  if (!deleted) {
    throw new Error("Knowledge Object를 찾을 수 없습니다.");
  }

  await knowledgeObjectRelationService.deleteByKnowledgeObjectId(id);

  return deleted;
}
