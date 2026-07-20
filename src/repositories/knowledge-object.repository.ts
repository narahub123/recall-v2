import { EmbeddingModel } from "@/embedding/embedding-models";
import { KnowledgeObject } from "@/models/knowledge-object.model";

export class KnowledgeObjectRepository {
  async create(data: {
    noteId: string;

    extractionId?: string;

    promptVersionId: string;

    name: string;

    description: string;

    reason: string;

    parent?: string | null;

    embeddingText: string;

    embeddingModel: EmbeddingModel;

    embedding: number[];
  }) {
    return KnowledgeObject.create(data);
  }

  async findById(id: string) {
    return KnowledgeObject.findById(id).lean();
  }

  async findAll() {
    return KnowledgeObject.find()
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findByNoteId(noteId: string) {
    return KnowledgeObject.find({
      noteId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async findByExtractionId(extractionId: string) {
    return KnowledgeObject.find({
      extractionId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      reason?: string;
      parent?: string | null;
      embeddingText?: string;
    },
  ) {
    return KnowledgeObject.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return KnowledgeObject.findByIdAndDelete(id);
  }
}
