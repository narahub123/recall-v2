import { PromptVersionDTO } from "@/dto/prompt-version.dto";

export class PromptVersionMapper {
  static toDTO(promptVersion: {
    _id: unknown;
    promptGroupId: unknown;
    version: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }): PromptVersionDTO {
    return {
      id: String(promptVersion._id),
      promptGroupId: String(promptVersion.promptGroupId),
      version: promptVersion.version,
      content: promptVersion.content,
      createdAt: promptVersion.createdAt.toISOString(),
      updatedAt: promptVersion.updatedAt.toISOString(),
    };
  }
}
