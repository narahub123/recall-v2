import type { KnowledgeObjectRelationGenerationDTO } from "./knowledge-object-relation-generation.dto";

export interface KnowledgeObjectRelationGenerationViewDTO extends Omit<
  KnowledgeObjectRelationGenerationDTO,
  "results"
> {
  knowledgeObject: {
    id: string;

    name: string;
  };

  promptVersion: {
    id: string;

    version: number;
  };

  promptGroup: {
    id: string;

    name: string;
  };

  candidateKnowledgeObjects: {
    id: string;

    name: string;
  }[];

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
  }[];
}
