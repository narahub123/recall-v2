import { Types } from "mongoose";

import { PromptVersion } from "@/models/prompt-version.model";

export class PromptVersionRepository {
  async create(data: {
    promptGroupId: string;
    version: number;
    content: string;
  }) {
    return PromptVersion.create({
      promptGroupId: new Types.ObjectId(data.promptGroupId),
      version: data.version,
      content: data.content,
    });
  }

  async findById(id: string) {
    return PromptVersion.findById(id);
  }

  async findByPromptGroupId(promptGroupId: string) {
    return PromptVersion.find({
      promptGroupId: new Types.ObjectId(promptGroupId),
    }).sort({
      version: -1,
    });
  }

  async update(
    id: string,
    data: {
      content?: string;
    },
  ) {
    return PromptVersion.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return PromptVersion.findByIdAndDelete(id);
  }

  async deleteByPromptGroupId(promptGroupId: string) {
    return PromptVersion.deleteMany({
      promptGroupId,
    });
  }
}
