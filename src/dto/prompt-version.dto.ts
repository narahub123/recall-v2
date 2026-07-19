import { PromptGroupDTO } from "./prompt-group.dto";

export interface PromptVersionDTO {
  id: string;
  promptGroupId: string;
  version: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
