import type { KnowledgeObjectGenerationDTO } from "./knowledge-object-generation.dto";

export interface KnowledgeObjectGenerationViewDTO extends KnowledgeObjectGenerationDTO {
  note: {
    id: string;

    title?: string;
  };

  promptVersion: {
    id: string;

    version: number;
  };

  promptGroup: {
    id: string;

    name: string;
  };

  knowledgeObjects: {
    id: string;

    name: string;
  }[];
}
