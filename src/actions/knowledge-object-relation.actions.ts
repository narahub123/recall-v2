"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";
import { knowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";
import type { ListQuery } from "@/types/list-query";
import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import type { KnowledgeObjectRelationSearch } from "@/types/knowledge-object-relation/search";

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
  query: ListQuery<
    KnowledgeObjectRelationFilter,
    KnowledgeObjectRelationSearch
  >,
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
