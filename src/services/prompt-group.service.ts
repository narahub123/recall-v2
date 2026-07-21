import { PromptGroupDTO } from "@/dto/prompt-group.dto";
import { PromptGroupMapper } from "@/mappers/prompt-group.mapper";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";
import {
  promptVersionService,
  PromptVersionService,
} from "./prompt-version.service";

export class PromptGroupService {
  constructor(
    private readonly promptGroupRepository: PromptGroupRepository,
    private readonly promptVersionService: PromptVersionService,
  ) {}

  async createPromptGroup(data: {
    name: string;
    description?: string;
  }): Promise<PromptGroupDTO> {
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
    await this.promptVersionService.deleteVersionsByPromptGroupId(id);

    const promptGroup = await this.promptGroupRepository.delete(id);

    if (!promptGroup) {
      return null;
    }

    return PromptGroupMapper.toDTO(promptGroup);
  }
}

export const promptGroupService = new PromptGroupService(
  new PromptGroupRepository(),
  promptVersionService,
);
