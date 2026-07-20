import { KnowledgeExtraction } from "@/models/knowledge-extraction.model";

export class KnowledgeExtractionRepository {
  async create(data: {
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
  }) {
    return KnowledgeExtraction.create(data);
  }

  async findById(id: string) {
    return KnowledgeExtraction.findById(id).lean();
  }

  async findAll() {
    return KnowledgeExtraction.find()
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  async update(
    id: string,
    data: {
      promptSnapshot?: string;
      model?: string;
      temperature?: number;
      responseFormat?: string;
      result?: {
        knowledge_objects: {
          name: string;
          description: string;
          reason: string;
          parent?: string | null;
        }[];
      };
      usage?: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
      };
    },
  ) {
    return KnowledgeExtraction.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return KnowledgeExtraction.findByIdAndDelete(id);
  }
}
