import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

export class KnowledgeExtractionDetailMapper {
  static toDTO(knowledgeExtraction: {
    _id: unknown;

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

    createdAt: Date;

    updatedAt: Date;
  }): KnowledgeExtractionDetailDTO {
    return {
      id: String(knowledgeExtraction._id),

      noteId: knowledgeExtraction.noteId,

      promptVersionId: knowledgeExtraction.promptVersionId,

      promptSnapshot: knowledgeExtraction.promptSnapshot,

      model: knowledgeExtraction.model,

      temperature: knowledgeExtraction.temperature,

      responseFormat: knowledgeExtraction.responseFormat,

      result: knowledgeExtraction.result,

      usage: knowledgeExtraction.usage,

      createdAt: knowledgeExtraction.createdAt.toISOString(),

      updatedAt: knowledgeExtraction.updatedAt.toISOString(),
    };
  }
}
