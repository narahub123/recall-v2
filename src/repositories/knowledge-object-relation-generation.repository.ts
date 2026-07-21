import { KnowledgeObjectRelationGeneration } from "@/models/knowledge-object-relation-generation.model";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";

export class KnowledgeObjectRelationGenerationRepository {
  async create(data: {
    knowledgeObjectId: string;

    promptVersionId: string;

    promptSnapshot: string;

    model: string;

    temperature: number;

    responseFormat: string;

    candidateKnowledgeObjectIds: string[];

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
    return KnowledgeObjectRelationGeneration.findById(id);
  }

  async findAll() {
    return KnowledgeObjectRelationGeneration.find().sort({
      createdAt: -1,
    });
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
