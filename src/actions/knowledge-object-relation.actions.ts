"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";

import { KnowledgeObjectRelationRepository } from "@/repositories/knowledge-object-relation.repository";
import { KnowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";

const knowledgeObjectRelationService = new KnowledgeObjectRelationService(
  new KnowledgeObjectRelationRepository(),
);

export async function createKnowledgeObjectRelationAction(data: {
  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  relationType: string;

  reason: string;

  confidence: number;
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.createRelation(data);
}

export async function getKnowledgeObjectRelationAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.getRelationById(id);
}

export async function getKnowledgeObjectRelationsAction() {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.getRelations();
}

export async function getKnowledgeObjectRelationsByKnowledgeObjectIdAction(
  knowledgeObjectId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.getRelationsByKnowledgeObjectId(
    knowledgeObjectId,
  );
}

export async function updateKnowledgeObjectRelationAction(
  id: string,
  data: {
    relationType?: string;

    reason?: string;

    confidence?: number;
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.updateRelation(id, data);
}

export async function deleteKnowledgeObjectRelationAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.deleteRelation(id);
}

export async function deleteKnowledgeObjectRelationsByKnowledgeObjectIdAction(
  knowledgeObjectId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.deleteRelationsByKnowledgeObjectId(
    knowledgeObjectId,
  );
}
