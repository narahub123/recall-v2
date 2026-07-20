import type { EmbeddingClient } from "@/embedding/embedding-client";
import type { EmbeddingModel } from "@/embedding/embedding-models";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeObjectService } from "@/services/knowledge-object.service";

import type { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";

export class KnowledgeObjectGenerationService {
  constructor(
    private readonly knowledgeExtractionRepository: KnowledgeExtractionRepository,

    private readonly knowledgeObjectService: KnowledgeObjectService,

    private readonly embeddingClient: EmbeddingClient,
  ) {}

  async createFromExtraction(
    extractionId: string,
    embeddingModel: EmbeddingModel,
  ): Promise<KnowledgeObjectDTO[]> {
    const extraction =
      await this.knowledgeExtractionRepository.findById(extractionId);

    if (!extraction) {
      throw new Error("KnowledgeExtraction not found");
    }

    const objects = extraction.result.knowledge_objects;

    const embeddingTexts = objects.map((object) =>
      this.createEmbeddingText(object.name, object.description, object.parent),
    );

    const embeddingResponse = await this.embeddingClient.embed({
      texts: embeddingTexts,

      model: embeddingModel,
    });

    const knowledgeObjects = await Promise.all(
      objects.map((object, index) =>
        this.knowledgeObjectService.createKnowledgeObject({
          noteId: extraction.noteId,

          extractionId: extraction._id.toString(),

          promptVersionId: extraction.promptVersionId,

          name: object.name,

          description: object.description,

          reason: object.reason,

          parent: object.parent,

          embeddingText: embeddingTexts[index],

          embeddingModel,

          embedding: embeddingResponse.embeddings[index],
        }),
      ),
    );

    return knowledgeObjects;
  }

  private createEmbeddingText(
    name: string,
    description: string,
    parent?: string | null,
  ): string {
    return [name, description, parent ? `상위 개념: ${parent}` : null]
      .filter(Boolean)
      .join("\n");
  }
}
