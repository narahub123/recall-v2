import { KnowledgeExtractionViewDTO } from "@/dto/knowledge-extraction-view.dto";
import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

export class KnowledgeExtractionViewMapper {
  static toDTO(
    knowledgeExtraction: KnowledgeExtractionDetailDTO,
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
  ): KnowledgeExtractionViewDTO {
    return {
      ...knowledgeExtraction,

      note,

      promptVersion,

      promptGroup,
    };
  }
}
