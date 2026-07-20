import {
  KnowledgeObjectGeneration,
  type IKnowledgeObjectGeneration,
} from "@/models/knowledge-object-generation.model";

export class KnowledgeObjectGenerationRepository {
  async create(
    data: Partial<IKnowledgeObjectGeneration>,
  ): Promise<IKnowledgeObjectGeneration> {
    const generation = await KnowledgeObjectGeneration.create(data);

    return generation;
  }

  async findById(id: string): Promise<IKnowledgeObjectGeneration | null> {
    return KnowledgeObjectGeneration.findById(id);
  }

  async findAll(): Promise<IKnowledgeObjectGeneration[]> {
    return KnowledgeObjectGeneration.find().sort({
      createdAt: -1,
    });
  }

  async update(
    id: string,
    data: Partial<IKnowledgeObjectGeneration>,
  ): Promise<IKnowledgeObjectGeneration | null> {
    return KnowledgeObjectGeneration.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async findByExtractionId(
    extractionId: string,
  ): Promise<IKnowledgeObjectGeneration | null> {
    return KnowledgeObjectGeneration.findOne({
      extractionId,
    });
  }
}
