import { KnowledgeExtractionDTO } from "./knowledge-extraction.dto";

export interface KnowledgeExtractionDetailDTO extends KnowledgeExtractionDTO {
  promptSnapshot: string;

  result: {
    knowledge_objects: {
      name: string;
      description: string;
      reason: string;
      parent?: string | null;
    }[];
  };
}
