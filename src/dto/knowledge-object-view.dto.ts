import { KnowledgeObjectDTO } from "./knowledge-object.dto";

export interface KnowledgeObjectViewDTO extends KnowledgeObjectDTO {
  note: {
    id: string;
    title?: string;
  };

  extraction?: {
    id: string;
    model: string;
    createdAt: string;
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
