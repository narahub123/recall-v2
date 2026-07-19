import { PromptGroupDTO } from "@/dto/prompt-group.dto";

export class PromptGroupMapper {
  static toDTO(promptGroup: {
    _id: unknown;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }): PromptGroupDTO {
    return {
      id: String(promptGroup._id),
      name: promptGroup.name,
      description: promptGroup.description,
      createdAt: promptGroup.createdAt.toISOString(),
      updatedAt: promptGroup.updatedAt.toISOString(),
    };
  }
}
