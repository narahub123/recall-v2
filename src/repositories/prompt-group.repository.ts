import { PromptGroup } from "@/models/prompt-group.model";

export class PromptGroupRepository {
  async create(data: { name: string; description?: string }) {
    return PromptGroup.create(data);
  }

  async findAll() {
    return PromptGroup.find().sort({
      createdAt: -1,
    });
  }

  async findById(id: string) {
    return PromptGroup.findById(id);
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    return PromptGroup.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return PromptGroup.findByIdAndDelete(id);
  }
}
