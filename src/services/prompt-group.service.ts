import { PromptGroupDTO } from "@/dto/prompt-group.dto";
import { PromptGroupMapper } from "@/mappers/prompt-group.mapper";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";

export class PromptGroupService {
  constructor(private readonly promptGroupRepository: PromptGroupRepository) {}

  async createPromptGroup(data: {
    key: string;
    name: string;
    description?: string;
  }): Promise<PromptGroupDTO> {
    const existing = await this.promptGroupRepository.findByKey(data.key);

    if (existing) {
      throw new Error("이미 존재하는 Prompt Group입니다.");
    }

    const promptGroup = await this.promptGroupRepository.create(data);

    return PromptGroupMapper.toDTO(promptGroup);
  }

  async getPromptGroups(): Promise<PromptGroupDTO[]> {
    const promptGroups = await this.promptGroupRepository.findAll();

    return promptGroups.map((promptGroup) =>
      PromptGroupMapper.toDTO(promptGroup),
    );
  }

  async getPromptGroupById(id: string): Promise<PromptGroupDTO | null> {
    const promptGroup = await this.promptGroupRepository.findById(id);

    if (!promptGroup) {
      return null;
    }

    return PromptGroupMapper.toDTO(promptGroup);
  }

  async updatePromptGroup(
    id: string,
    data: {
      name?: string;
      description?: string;
    },
  ): Promise<PromptGroupDTO | null> {
    const promptGroup = await this.promptGroupRepository.update(id, data);

    if (!promptGroup) {
      return null;
    }

    return PromptGroupMapper.toDTO(promptGroup);
  }

  async deletePromptGroup(id: string): Promise<PromptGroupDTO | null> {
    const promptGroup = await this.promptGroupRepository.delete(id);

    if (!promptGroup) {
      return null;
    }

    return PromptGroupMapper.toDTO(promptGroup);
  }
}
