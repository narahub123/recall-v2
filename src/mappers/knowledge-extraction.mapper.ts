import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";

export class KnowledgeExtractionMapper {
  static toDTO(knowledgeExtraction: {
    _id: unknown;

    noteId: string;

    promptVersionId: string;

    model: string;

    temperature: number;

    responseFormat: string;

    usage: {
      inputTokens: number;
      outputTokens: number;
      totalTokens: number;
    };

    createdAt: Date;

    updatedAt: Date;
  }): KnowledgeExtractionDTO {
    return {
      id: String(knowledgeExtraction._id),

      noteId: knowledgeExtraction.noteId,

      promptVersionId: knowledgeExtraction.promptVersionId,

      model: knowledgeExtraction.model,

      temperature: knowledgeExtraction.temperature,

      responseFormat: knowledgeExtraction.responseFormat,

      usage: knowledgeExtraction.usage,

      createdAt: knowledgeExtraction.createdAt.toISOString(),

      updatedAt: knowledgeExtraction.updatedAt.toISOString(),
    };
  }
}
