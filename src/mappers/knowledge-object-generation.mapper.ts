import type { KnowledgeObjectGenerationDTO } from "@/dto/knowledge-object-generation.dto";

import type { IKnowledgeObjectGeneration } from "@/models/knowledge-object-generation.model";

export class KnowledgeObjectGenerationMapper {
  static toDTO(
    generation: IKnowledgeObjectGeneration,
  ): KnowledgeObjectGenerationDTO {
    return {
      id: generation._id.toString(),

      noteId: generation.noteId,

      extractionId: generation.extractionId,

      promptVersionId: generation.promptVersionId,

      embeddingModel: generation.embeddingModel,

      knowledgeObjectIds: [...generation.knowledgeObjectIds],

      usage: {
        inputTokens: generation.usage.inputTokens,
        totalTokens: generation.usage.totalTokens,
      },

      status: generation.status,

      errorMessage: generation.errorMessage ?? null,

      createdAt: generation.createdAt.toISOString(),

      updatedAt: generation.updatedAt.toISOString(),
    };
  }
}
