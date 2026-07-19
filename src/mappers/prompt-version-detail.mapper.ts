import { PromptGroupDTO } from "@/dto/prompt-group.dto";
import { PromptVersionDetailDTO } from "@/dto/prompt-version-detail.dto";
import { PromptVersionDTO } from "@/dto/prompt-version.dto";

export class PromptVersionDetailMapper {
  static toDTO(
    promptVersion: PromptVersionDTO,
    promptGroup: PromptGroupDTO,
  ): PromptVersionDetailDTO {
    return {
      id: promptVersion.id,
      version: promptVersion.version,
      content: promptVersion.content,
      createdAt: promptVersion.createdAt,
      updatedAt: promptVersion.updatedAt,

      promptGroup: {
        id: promptGroup.id,
        name: promptGroup.name,
      },
    };
  }
}
