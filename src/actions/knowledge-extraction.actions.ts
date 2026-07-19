"use server";

import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";
import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeExtractionService } from "@/services/knowledge-extraction.service";

const knowledgeExtractionService = new KnowledgeExtractionService(
  new KnowledgeExtractionRepository(),
);

export async function createKnowledgeExtractionAction(data: {
  noteId: string;
  promptVersionId: string;
  promptSnapshot: string;
  model: string;
  temperature: number;
  responseFormat: string;
  result: {
    knowledge_objects: {
      name: string;
      description: string;
      reason: string;
      parent?: string | null;
    }[];
  };
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.createExtraction(data);
}

export async function getKnowledgeExtractionAction(
  id: string,
): Promise<KnowledgeExtractionDetailDTO | null> {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.getExtractionById(id);
}

export async function getKnowledgeExtractionsAction(): Promise<
  KnowledgeExtractionDTO[]
> {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.getExtractions();
}

export async function updateKnowledgeExtractionAction(
  id: string,
  data: {
    promptSnapshot?: string;
    model?: string;
    temperature?: number;
    responseFormat?: string;
    result?: {
      knowledge_objects: {
        name: string;
        description: string;
        reason: string;
        parent?: string | null;
      }[];
    };
    usage?: {
      inputTokens: number;
      outputTokens: number;
      totalTokens: number;
    };
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.updateExtraction(id, data);
}

export async function deleteKnowledgeExtractionAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.deleteExtraction(id);
}
