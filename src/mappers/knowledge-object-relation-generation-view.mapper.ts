import type { KnowledgeObjectRelationGenerationDTO } from "@/dto/knowledge-object-relation-generation.dto";
import type { KnowledgeObjectRelationGenerationViewDTO } from "@/dto/knowledge-object-relation-generation-view.dto";

export class KnowledgeObjectRelationGenerationViewMapper {
  static toDTO(
    generation: KnowledgeObjectRelationGenerationDTO,

    knowledgeObject: {
      id: string;

      name: string;
    },

    promptVersion: {
      id: string;

      version: number;
    },

    promptGroup: {
      id: string;

      name: string;
    },

    candidateKnowledgeObjects: {
      id: string;

      name: string;
    }[],

    results: {
      source: {
        id: string;

        name: string;
      };

      target: {
        id: string;

        name: string;
      };

      related: boolean;

      relationType?: string | null;

      reason?: string | null;

      confidence?: number | null;
    }[],
  ): KnowledgeObjectRelationGenerationViewDTO {
    return {
      ...generation,

      knowledgeObject,

      promptVersion,

      promptGroup,

      candidateKnowledgeObjects,

      results,
    };
  }
}
