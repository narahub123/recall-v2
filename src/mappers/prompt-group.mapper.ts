import { PromptGroupDTO } from "@/dto/prompt-group.dto";

export class PromptGroupMapper {
  static toDTO(promptGroup: {
    _id: unknown;
    key: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }): PromptGroupDTO {
    return {
      id: String(promptGroup._id),
      key: promptGroup.key,
      name: promptGroup.name,
      description: promptGroup.description,
      createdAt: promptGroup.createdAt.toISOString(),
      updatedAt: promptGroup.updatedAt.toISOString(),
    };
  }
}
