import { KnowledgeObjectDTO } from "@/dto/knowledge-object.dto";
import { KnowledgeObjectViewDTO } from "@/dto/knowledge-object-view.dto";

export class KnowledgeObjectViewMapper {
  static toDTO(
    knowledgeObject: KnowledgeObjectDTO,
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
    extraction?: {
      id: string;
      model: string;
      createdAt: string;
    },
  ): KnowledgeObjectViewDTO {
    return {
      ...knowledgeObject,

      note,

      extraction,

      promptVersion,

      promptGroup,
    };
  }
}
