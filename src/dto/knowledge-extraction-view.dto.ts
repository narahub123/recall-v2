import { KnowledgeExtractionDetailDTO } from "./knowledge-extraction-detail.dto";

export interface KnowledgeExtractionViewDTO extends KnowledgeExtractionDetailDTO {
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
}
