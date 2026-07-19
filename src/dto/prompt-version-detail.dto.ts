import { PromptVersionDTO } from "./prompt-version.dto";

export interface PromptVersionDetailDTO extends PromptVersionDTO {
  promptGroup: {
    id: string;
    name: string;
  };
}
