"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";
import { knowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";
import { ListQuery } from "@/types/pagination";
import { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";

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

export async function getKnowledgeObjectRelationsAction(
  query: ListQuery<KnowledgeObjectRelationFilter>,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationService.getRelations(query);
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
