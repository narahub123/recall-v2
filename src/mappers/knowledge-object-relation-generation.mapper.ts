import type { KnowledgeObjectRelationGenerationDTO } from "@/dto/knowledge-object-relation-generation.dto";

export class KnowledgeObjectRelationGenerationMapper {
  static toDTO(data: {
    _id: unknown;

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

    status: string;

    errorMessage?: string | null;

    createdAt: Date;

    updatedAt: Date;
  }): KnowledgeObjectRelationGenerationDTO {
    return {
      id: String(data._id),

      knowledgeObjectId: data.knowledgeObjectId,

      promptVersionId: data.promptVersionId,

      promptSnapshot: data.promptSnapshot,

      model: data.model,

      temperature: data.temperature,

      responseFormat: data.responseFormat,

      candidateKnowledgeObjectIds: data.candidateKnowledgeObjectIds,

      results: data.results,

      usage: data.usage,

      status: data.status,

      errorMessage: data.errorMessage ?? null,

      createdAt: data.createdAt.toISOString(),

      updatedAt: data.updatedAt.toISOString(),
    };
  }
}
