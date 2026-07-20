"use server";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";

import { KnowledgeObjectService } from "@/services/knowledge-object.service";
import { KnowledgeObjectGenerationService } from "@/services/knowledge-object-generation.service";
import { OpenAiEmbeddingClient } from "@/embedding/providers/openai/openai-embedding-client";
import { EmbeddingModel } from "@/embedding/embedding-models";

export async function createKnowledgeObjectsFromExtractionAction(
  extractionId: string,
  embeddingModel: EmbeddingModel,
) {
  const generationService = new KnowledgeObjectGenerationService(
    new KnowledgeExtractionRepository(),

    new KnowledgeObjectService(new KnowledgeObjectRepository()),

    new OpenAiEmbeddingClient(),
  );

  return generationService.createFromExtraction(
    extractionId,

    embeddingModel,
  );
}
