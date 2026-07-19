import { PromptVersionMapper } from "@/mappers/prompt-version.mapper";
import { PromptVersionRepository } from "@/repositories/prompt-version.repository";

import { PromptVersionDTO } from "@/dto/prompt-version.dto";

export class PromptVersionService {
  constructor(
    private readonly promptVersionRepository: PromptVersionRepository,
  ) {}

  async createVersion(data: {
    promptGroupId: string;
    content: string;
  }): Promise<PromptVersionDTO> {
    const versions = await this.promptVersionRepository.findByPromptGroupId(
      data.promptGroupId,
    );

    const nextVersion = versions.length > 0 ? versions[0].version + 1 : 1;

    const promptVersion = await this.promptVersionRepository.create({
      promptGroupId: data.promptGroupId,
      version: nextVersion,
      content: data.content,
    });

    return PromptVersionMapper.toDTO(promptVersion);
  }

  async getVersionById(id: string): Promise<PromptVersionDTO | null> {
    const promptVersion = await this.promptVersionRepository.findById(id);

    if (!promptVersion) {
      return null;
    }

    return PromptVersionMapper.toDTO(promptVersion);
  }

  async getVersionsByPromptGroupId(
    promptGroupId: string,
  ): Promise<PromptVersionDTO[]> {
    const versions =
      await this.promptVersionRepository.findByPromptGroupId(promptGroupId);

    return versions.map((version) => PromptVersionMapper.toDTO(version));
  }

  async updateVersion(
    id: string,
    data: {
      content?: string;
    },
  ): Promise<PromptVersionDTO | null> {
    const promptVersion = await this.promptVersionRepository.update(id, data);

    if (!promptVersion) {
      return null;
    }

    return PromptVersionMapper.toDTO(promptVersion);
  }

  async deleteVersion(id: string): Promise<PromptVersionDTO | null> {
    const promptVersion = await this.promptVersionRepository.delete(id);

    if (!promptVersion) {
      return null;
    }

    return PromptVersionMapper.toDTO(promptVersion);
  }

  async deleteVersionsByPromptGroupId(promptGroupId: string) {
    return this.promptVersionRepository.deleteByPromptGroupId(promptGroupId);
  }
}
