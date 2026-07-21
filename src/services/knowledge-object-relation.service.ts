import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

import { KnowledgeObjectRelationMapper } from "@/mappers/knowledge-object-relation.mapper";

import { KnowledgeObjectRelationRepository } from "@/repositories/knowledge-object-relation.repository";
import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";
import type { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import type { KnowledgeObjectRelationSearch } from "@/types/knowledge-object-relation/search";
import type { ListQuery } from "@/types/list-query";
import type { PaginatedResult } from "@/types/pagination";

export class KnowledgeObjectRelationService {
  constructor(
    private readonly knowledgeObjectRelationRepository: KnowledgeObjectRelationRepository,
    private readonly knowledgeObjectRepository: KnowledgeObjectRepository,
  ) {}

  async createRelation(data: {
    sourceKnowledgeObjectId: string;

    targetKnowledgeObjectId: string;

    relationType: string;

    reason: string;

    confidence: number;
  }): Promise<KnowledgeObjectRelationDTO> {
    if (data.sourceKnowledgeObjectId === data.targetKnowledgeObjectId) {
      throw new Error(
        "Knowledge Object는 자기 자신과 관계를 생성할 수 없습니다.",
      );
    }

    const exists = await this.knowledgeObjectRelationRepository.findByRelation(
      data.sourceKnowledgeObjectId,
      data.targetKnowledgeObjectId,
      data.relationType,
    );

    if (exists) {
      throw new Error("이미 존재하는 Knowledge Object Relation입니다.");
    }

    const relation = await this.knowledgeObjectRelationRepository.create(data);

    return KnowledgeObjectRelationMapper.toDTO(relation);
  }

  async getRelationById(
    id: string,
  ): Promise<KnowledgeObjectRelationDTO | null> {
    const relation = await this.knowledgeObjectRelationRepository.findById(id);

    if (!relation) {
      return null;
    }

    return KnowledgeObjectRelationMapper.toDTO(relation);
  }

  async getRelations(
    query: ListQuery<
      KnowledgeObjectRelationFilter,
      KnowledgeObjectRelationSearch
    >,
  ): Promise<PaginatedResult<KnowledgeObjectRelationDTO>> {
    const { relations, total } =
      await this.knowledgeObjectRelationRepository.findAll(query);

    const items = relations.map((relation) =>
      KnowledgeObjectRelationMapper.toDTO(relation),
    );

    const totalPages = Math.ceil(total / query.limit);

    return {
      items,

      pagination: {
        page: query.page,

        limit: query.limit,

        total,

        totalPages,

        hasNextPage: query.page < totalPages,

        hasPreviousPage: query.page > 1,
      },
    };
  }

  async getRelationsByKnowledgeObjectId(
    knowledgeObjectId: string,
  ): Promise<KnowledgeObjectRelationDTO[]> {
    const relations =
      await this.knowledgeObjectRelationRepository.findByKnowledgeObjectId(
        knowledgeObjectId,
      );

    return relations.map((relation) =>
      KnowledgeObjectRelationMapper.toDTO(relation),
    );
  }

  async updateRelation(
    id: string,
    data: {
      relationType?: string;

      reason?: string;

      confidence?: number;
    },
  ): Promise<KnowledgeObjectRelationDTO | null> {
    const relation = await this.knowledgeObjectRelationRepository.update(
      id,
      data,
    );

    if (!relation) {
      return null;
    }

    return KnowledgeObjectRelationMapper.toDTO(relation);
  }

  async deleteRelation(id: string): Promise<KnowledgeObjectRelationDTO | null> {
    const relation = await this.knowledgeObjectRelationRepository.delete(id);

    if (!relation) {
      return null;
    }

    return KnowledgeObjectRelationMapper.toDTO(relation);
  }

  async deleteRelationsByKnowledgeObjectId(knowledgeObjectId: string) {
    return this.knowledgeObjectRelationRepository.deleteByKnowledgeObjectId(
      knowledgeObjectId,
    );
  }

  async deleteByKnowledgeObjectId(knowledgeObjectId: string) {
    return this.knowledgeObjectRelationRepository.deleteByKnowledgeObjectId(
      knowledgeObjectId,
    );
  }

  async generateRelations(knowledgeObjectId: string) {
    const target =
      await this.knowledgeObjectRepository.findById(knowledgeObjectId);

    if (!target) {
      throw new Error("KnowledgeObject를 찾을 수 없습니다.");
    }

    const candidates = await this.knowledgeObjectRepository.findSimilar(
      target.embedding,
      target.noteId,
      5,
    );

    return {
      target,
      candidates,
    };
  }
}

export const knowledgeObjectRelationService =
  new KnowledgeObjectRelationService(
    new KnowledgeObjectRelationRepository(),
    new KnowledgeObjectRepository(),
  );
