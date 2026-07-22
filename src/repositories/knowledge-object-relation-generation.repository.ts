import { KnowledgeObjectRelationGeneration } from "@/models/knowledge-object-relation-generation.model";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";
import { KnowledgeObjectRelationGenerationFilter } from "@/types/knowledge-object-relation-generation/filter";
import { KnowledgeObjectRelationGenerationSearch } from "@/types/knowledge-object-relation-generation/search";
import { ListQuery } from "@/types/list-query";

export class KnowledgeObjectRelationGenerationRepository {
  async create(data: {
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
  }) {
    return KnowledgeObjectRelationGeneration.create(data);
  }

  async findById(id: string) {
    return KnowledgeObjectRelationGeneration.findById(id).lean();
  }

  async findAll({
    page,
    limit,
  }: ListQuery<
    KnowledgeObjectRelationGenerationFilter,
    KnowledgeObjectRelationGenerationSearch
  >) {
    const skip = (page - 1) * limit;

    const [generations, total] = await Promise.all([
      KnowledgeObjectRelationGeneration.find()
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      KnowledgeObjectRelationGeneration.countDocuments(),
    ]);

    return {
      generations,

      total,
    };
  }

  async findByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelationGeneration.find({
      knowledgeObjectId,
    }).sort({
      createdAt: -1,
    });
  }

  async findByPromptVersionId(promptVersionId: string) {
    return KnowledgeObjectRelationGeneration.find({
      promptVersionId,
    }).sort({
      createdAt: -1,
    });
  }

  async update(
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
  ) {
    return KnowledgeObjectRelationGeneration.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    return KnowledgeObjectRelationGeneration.findByIdAndDelete(id);
  }

  async deleteByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelationGeneration.deleteMany({
      knowledgeObjectId,
    });
  }
}

export const knowledgeObjectRelationGenerationRepository =
  new KnowledgeObjectRelationGenerationRepository();
