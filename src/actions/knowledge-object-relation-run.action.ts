"use server";

import { knowledgeObjectRelationRunService } from "@/services/knowledge-object-relation-run.service";

export async function runKnowledgeObjectRelationAction(data: {
  knowledgeObjectId: string;

  promptVersionId: string;

  model: string;

  temperature?: number;
}) {
  return knowledgeObjectRelationRunService.run(data);
}
