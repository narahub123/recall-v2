import { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";

export class KnowledgeObjectMapper {
  static toDTO(knowledgeObject: {
    _id: unknown;

    noteId: string;

    extractionId?: string;

    promptVersionId: string;

    name: string;

    description: string;

    reason: string;

    parent?: string | null;

    embeddingText: string;

    embedding: number[];

    createdAt: Date;

    updatedAt: Date;
  }): KnowledgeObjectDTO {
    return {
      id: String(knowledgeObject._id),

      noteId: knowledgeObject.noteId,

      extractionId: knowledgeObject.extractionId,

      promptVersionId: knowledgeObject.promptVersionId,

      name: knowledgeObject.name,

      description: knowledgeObject.description,

      reason: knowledgeObject.reason,

      parent: knowledgeObject.parent,

      embeddingText: knowledgeObject.embeddingText,

      embedding: knowledgeObject.embedding,

      createdAt: knowledgeObject.createdAt.toISOString(),

      updatedAt: knowledgeObject.updatedAt.toISOString(),
    };
  }
}
