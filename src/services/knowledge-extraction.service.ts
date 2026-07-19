import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";
import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

import { KnowledgeExtractionMapper } from "@/mappers/knowledge-extraction.mapper";
import { KnowledgeExtractionDetailMapper } from "@/mappers/knowledge-extraction-detail.mapper";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";

export class KnowledgeExtractionService {
  constructor(
    private readonly knowledgeExtractionRepository: KnowledgeExtractionRepository,
  ) {}

  async createExtraction(data: {
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
  }): Promise<KnowledgeExtractionDetailDTO> {
    const knowledgeExtraction =
      await this.knowledgeExtractionRepository.create(data);

    return KnowledgeExtractionDetailMapper.toDTO(knowledgeExtraction);
  }

  async getExtractionById(
    id: string,
  ): Promise<KnowledgeExtractionDetailDTO | null> {
    const knowledgeExtraction =
      await this.knowledgeExtractionRepository.findById(id);

    if (!knowledgeExtraction) {
      return null;
    }

    return KnowledgeExtractionDetailMapper.toDTO(knowledgeExtraction);
  }

  async getExtractions(): Promise<KnowledgeExtractionDTO[]> {
    const knowledgeExtractions =
      await this.knowledgeExtractionRepository.findAll();

    return knowledgeExtractions.map((knowledgeExtraction) =>
      KnowledgeExtractionMapper.toDTO(knowledgeExtraction),
    );
  }

  async updateExtraction(
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
  ): Promise<KnowledgeExtractionDetailDTO | null> {
    const knowledgeExtraction = await this.knowledgeExtractionRepository.update(
      id,
      data,
    );

    if (!knowledgeExtraction) {
      return null;
    }

    return KnowledgeExtractionDetailMapper.toDTO(knowledgeExtraction);
  }

  async deleteExtraction(
    id: string,
  ): Promise<KnowledgeExtractionDetailDTO | null> {
    const knowledgeExtraction =
      await this.knowledgeExtractionRepository.delete(id);

    if (!knowledgeExtraction) {
      return null;
    }

    return KnowledgeExtractionDetailMapper.toDTO(knowledgeExtraction);
  }
}
