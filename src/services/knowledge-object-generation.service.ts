import type { EmbeddingClient } from "@/embedding/embedding-client";
import type { EmbeddingModel } from "@/embedding/embedding-models";

import type { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";

import { KNOWLEDGE_OBJECT_GENERATION_STATUS } from "@/models/knowledge-object-generation.model";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeObjectGenerationRepository } from "@/repositories/knowledge-object-generation.repository";

import { KnowledgeObjectService } from "@/services/knowledge-object.service";
import { KnowledgeObjectGenerationDTO } from "@/dto/knowledge-object-generation.dto";
import { KnowledgeObjectGenerationMapper } from "@/mappers/knowledge-object-generation.mapper";

export class KnowledgeObjectGenerationService {
  constructor(
    private readonly knowledgeExtractionRepository: KnowledgeExtractionRepository,

    private readonly knowledgeObjectService: KnowledgeObjectService,

    private readonly embeddingClient: EmbeddingClient,

    private readonly knowledgeObjectGenerationRepository: KnowledgeObjectGenerationRepository,
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

    const generation = await this.knowledgeObjectGenerationRepository.create({
      noteId: extraction.noteId,

      extractionId: extraction._id.toString(),

      promptVersionId: extraction.promptVersionId,

      embeddingModel,

      knowledgeObjectIds: [],

      usage: {
        inputTokens: 0,

        totalTokens: 0,
      },

      status: KNOWLEDGE_OBJECT_GENERATION_STATUS.PROCESSING,
    });

    try {
      const objects = extraction.result.knowledge_objects;

      const embeddingTexts = objects.map((object) =>
        this.createEmbeddingText(
          object.name,
          object.description,
          object.parent,
        ),
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

      await this.knowledgeObjectGenerationRepository.update(
        generation._id.toString(),
        {
          knowledgeObjectIds: knowledgeObjects.map(
            (knowledgeObject) => knowledgeObject.id,
          ),

          usage: {
            inputTokens: embeddingResponse.usage.inputTokens,

            totalTokens: embeddingResponse.usage.totalTokens,
          },

          status: KNOWLEDGE_OBJECT_GENERATION_STATUS.COMPLETED,
        },
      );

      return knowledgeObjects;
    } catch (error) {
      await this.knowledgeObjectGenerationRepository.update(
        generation._id.toString(),
        {
          status: KNOWLEDGE_OBJECT_GENERATION_STATUS.FAILED,

          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
        },
      );

      throw error;
    }
  }

  async getGenerationById(
    id: string,
  ): Promise<KnowledgeObjectGenerationDTO | null> {
    const generation =
      await this.knowledgeObjectGenerationRepository.findById(id);

    if (!generation) {
      return null;
    }

    return KnowledgeObjectGenerationMapper.toDTO(generation);
  }

  async getGenerations(): Promise<KnowledgeObjectGenerationDTO[]> {
    const generations =
      await this.knowledgeObjectGenerationRepository.findAll();

    return generations.map((generation) =>
      KnowledgeObjectGenerationMapper.toDTO(generation),
    );
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
