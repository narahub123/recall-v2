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

  async findSimilar(
    embedding: number[],
    excludeNoteId: string,
    limit: number = 5,
  ) {
    const searchLimit = limit * 4;

    return KnowledgeObject.aggregate([
      {
        $vectorSearch: {
          index: "knowledge_object_vector_index",

          path: "embedding",

          queryVector: embedding,

          numCandidates: 100,

          limit: searchLimit,
        },
      },

      {
        $match: {
          noteId: {
            $ne: excludeNoteId,
          },
        },
      },

      {
        $limit: limit,
      },

      {
        $project: {
          _id: 1,

          noteId: 1,

          name: 1,

          description: 1,

          reason: 1,

          parent: 1,

          embedding: 1,

          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ]);
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
