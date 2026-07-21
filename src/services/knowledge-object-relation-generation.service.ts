import type { KnowledgeObjectRelationGenerationDTO } from "@/dto/knowledge-object-relation-generation.dto";

import { KnowledgeObjectRelationGenerationMapper } from "@/mappers/knowledge-object-relation-generation.mapper";

import { KnowledgeObjectRelationGenerationRepository } from "@/repositories/knowledge-object-relation-generation.repository";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";

export class KnowledgeObjectRelationGenerationService {
  constructor(
    private readonly knowledgeObjectRelationGenerationRepository: KnowledgeObjectRelationGenerationRepository,
  ) {}

  async createGeneration(data: {
    knowledgeObjectId: string;

    promptVersionId: string;

    promptSnapshot: string;

    model: string;

    temperature: number;

    responseFormat: string;

    candidateKnowledgeObjectIds: string[];

    knowledgeObjectRelationIds: string[];

    results: {
      sourceKnowledgeObjectId: string;

      targetKnowledgeObjectId: string;

      related: boolean;

      relationType?: string | null;

      reason?: string | null;

      confidence?: number | null;
    }[];

    usage: {
      inputTokens: number;

      outputTokens: number;

      totalTokens: number;
    };

    status: KnowledgeObjectRelationGenerationStatus;

    errorMessage?: string | null;
  }): Promise<KnowledgeObjectRelationGenerationDTO> {
    const generation =
      await this.knowledgeObjectRelationGenerationRepository.create(data);

    return KnowledgeObjectRelationGenerationMapper.toDTO(generation);
  }

  async getGenerationById(
    id: string,
  ): Promise<KnowledgeObjectRelationGenerationDTO | null> {
    const generation =
      await this.knowledgeObjectRelationGenerationRepository.findById(id);

    if (!generation) {
      return null;
    }

    return KnowledgeObjectRelationGenerationMapper.toDTO(generation);
  }

  async getGenerations(): Promise<KnowledgeObjectRelationGenerationDTO[]> {
    const generations =
      await this.knowledgeObjectRelationGenerationRepository.findAll();

    return generations.map((generation) =>
      KnowledgeObjectRelationGenerationMapper.toDTO(generation),
    );
  }

  async getGenerationsByKnowledgeObjectId(
    knowledgeObjectId: string,
  ): Promise<KnowledgeObjectRelationGenerationDTO[]> {
    const generations =
      await this.knowledgeObjectRelationGenerationRepository.findByKnowledgeObjectId(
        knowledgeObjectId,
      );

    return generations.map((generation) =>
      KnowledgeObjectRelationGenerationMapper.toDTO(generation),
    );
  }

  async getGenerationsByPromptVersionId(
    promptVersionId: string,
  ): Promise<KnowledgeObjectRelationGenerationDTO[]> {
    const generations =
      await this.knowledgeObjectRelationGenerationRepository.findByPromptVersionId(
        promptVersionId,
      );

    return generations.map((generation) =>
      KnowledgeObjectRelationGenerationMapper.toDTO(generation),
    );
  }

  async updateGeneration(
    id: string,

    data: {
      results?: {
        sourceKnowledgeObjectId: string;

        targetKnowledgeObjectId: string;

        related: boolean;

        relationType?: string | null;

        reason?: string | null;

        confidence?: number | null;
      }[];

      knowledgeObjectRelationIds?: string[];

      usage?: {
        inputTokens: number;

        outputTokens: number;

        totalTokens: number;
      };

      status?: KnowledgeObjectRelationGenerationStatus;

      errorMessage?: string | null;
    },
  ): Promise<KnowledgeObjectRelationGenerationDTO | null> {
    const generation =
      await this.knowledgeObjectRelationGenerationRepository.update(id, data);

    if (!generation) {
      return null;
    }

    return KnowledgeObjectRelationGenerationMapper.toDTO(generation);
  }

  async deleteGeneration(
    id: string,
  ): Promise<KnowledgeObjectRelationGenerationDTO | null> {
    const generation =
      await this.knowledgeObjectRelationGenerationRepository.delete(id);

    if (!generation) {
      return null;
    }

    return KnowledgeObjectRelationGenerationMapper.toDTO(generation);
  }

  async deleteGenerationsByKnowledgeObjectId(knowledgeObjectId: string) {
    return this.knowledgeObjectRelationGenerationRepository.deleteByKnowledgeObjectId(
      knowledgeObjectId,
    );
  }
}

export const knowledgeObjectRelationGenerationService =
  new KnowledgeObjectRelationGenerationService(
    new KnowledgeObjectRelationGenerationRepository(),
  );
