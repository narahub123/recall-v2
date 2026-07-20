import { KnowledgeObjectRelation } from "@/models/knowledge-object-relation.model";

export class KnowledgeObjectRelationRepository {
  async create(data: {
    sourceKnowledgeObjectId: string;

    targetKnowledgeObjectId: string;

    relationType: string;

    reason: string;

    confidence: number;
  }) {
    return KnowledgeObjectRelation.create(data);
  }

  async findById(id: string) {
    return KnowledgeObjectRelation.findById(id);
  }

  async findAll() {
    return KnowledgeObjectRelation.find().sort({
      createdAt: -1,
    });
  }

  async findByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelation.find({
      $or: [
        {
          sourceKnowledgeObjectId: knowledgeObjectId,
        },
        {
          targetKnowledgeObjectId: knowledgeObjectId,
        },
      ],
    }).sort({
      createdAt: -1,
    });
  }

  async findByRelation(
    sourceKnowledgeObjectId: string,

    targetKnowledgeObjectId: string,

    relationType: string,
  ) {
    return KnowledgeObjectRelation.findOne({
      relationType,

      $or: [
        {
          sourceKnowledgeObjectId,

          targetKnowledgeObjectId,
        },
        {
          sourceKnowledgeObjectId: targetKnowledgeObjectId,

          targetKnowledgeObjectId: sourceKnowledgeObjectId,
        },
      ],
    });
  }

  async update(
    id: string,

    data: {
      relationType?: string;

      reason?: string;

      confidence?: number;
    },
  ) {
    return KnowledgeObjectRelation.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    return KnowledgeObjectRelation.findByIdAndDelete(id);
  }

  async deleteByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelation.deleteMany({
      $or: [
        {
          sourceKnowledgeObjectId: knowledgeObjectId,
        },
        {
          targetKnowledgeObjectId: knowledgeObjectId,
        },
      ],
    });
  }
}
