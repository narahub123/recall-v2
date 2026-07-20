import type { KnowledgeObjectGenerationViewDTO } from "@/dto/knowledge-object-generation-view.dto";
import type { KnowledgeObjectGenerationDTO } from "@/dto/knowledge-object-generation.dto";

export class KnowledgeObjectGenerationViewMapper {
  static toDTO(
    generation: KnowledgeObjectGenerationDTO,
    note: {
      id: string;
      title?: string;
    },
    promptVersion: {
      id: string;
      version: number;
    },
    promptGroup: {
      id: string;
      name: string;
    },
    knowledgeObjects: {
      id: string;
      name: string;
    }[],
  ): KnowledgeObjectGenerationViewDTO {
    return {
      ...generation,

      note,

      promptVersion,

      promptGroup,

      knowledgeObjects,
    };
  }
}
