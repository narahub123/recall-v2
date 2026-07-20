import { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";
import { KnowledgeObjectMapper } from "@/mappers/knowledge-object.mapper";
import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";

export class KnowledgeObjectService {
  constructor(
    private readonly knowledgeObjectRepository: KnowledgeObjectRepository,
  ) {}

  async createKnowledgeObject(data: {
    noteId: string;
    extractionId?: string;
    promptVersionId: string;
    name: string;
    description: string;
    reason: string;
    parent?: string | null;
    embeddingText: string;
    embedding: number[];
  }): Promise<KnowledgeObjectDTO> {
    const knowledgeObject = await this.knowledgeObjectRepository.create(data);

    return KnowledgeObjectMapper.toDTO(knowledgeObject);
  }

  async getKnowledgeObjectById(id: string): Promise<KnowledgeObjectDTO | null> {
    const knowledgeObject = await this.knowledgeObjectRepository.findById(id);

    if (!knowledgeObject) {
      return null;
    }

    return KnowledgeObjectMapper.toDTO(knowledgeObject);
  }

  async getKnowledgeObjects(): Promise<KnowledgeObjectDTO[]> {
    const knowledgeObjects = await this.knowledgeObjectRepository.findAll();

    return knowledgeObjects.map((knowledgeObject) =>
      KnowledgeObjectMapper.toDTO(knowledgeObject),
    );
  }

  async getKnowledgeObjectsByNoteId(
    noteId: string,
  ): Promise<KnowledgeObjectDTO[]> {
    const knowledgeObjects =
      await this.knowledgeObjectRepository.findByNoteId(noteId);

    return knowledgeObjects.map((knowledgeObject) =>
      KnowledgeObjectMapper.toDTO(knowledgeObject),
    );
  }

  async getKnowledgeObjectsByExtractionId(
    extractionId: string,
  ): Promise<KnowledgeObjectDTO[]> {
    const knowledgeObjects =
      await this.knowledgeObjectRepository.findByExtractionId(extractionId);

    return knowledgeObjects.map((knowledgeObject) =>
      KnowledgeObjectMapper.toDTO(knowledgeObject),
    );
  }

  async updateKnowledgeObject(
    id: string,
    data: {
      name?: string;
      description?: string;
      reason?: string;
      parent?: string | null;
      embeddingText?: string;
    },
  ): Promise<KnowledgeObjectDTO | null> {
    const knowledgeObject = await this.knowledgeObjectRepository.update(
      id,
      data,
    );

    if (!knowledgeObject) {
      return null;
    }

    return KnowledgeObjectMapper.toDTO(knowledgeObject);
  }

  async deleteKnowledgeObject(id: string): Promise<KnowledgeObjectDTO | null> {
    const knowledgeObject = await this.knowledgeObjectRepository.delete(id);

    if (!knowledgeObject) {
      return null;
    }

    return KnowledgeObjectMapper.toDTO(knowledgeObject);
  }
}
