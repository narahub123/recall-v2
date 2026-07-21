import { KnowledgeRelationType } from "@/constants/knowledge-object-relation";
import { KnowledgeObjectRelation } from "@/models/knowledge-object-relation.model";
import { KnowledgeObjectRelationFilter } from "@/types/knowledge-object-relation/filter";
import { ListQuery } from "@/types/pagination";

import type { QueryConditions } from "@/types/query-conditions";

interface KnowledgeObjectRelationConditionShape {
  relationType: KnowledgeRelationType;
}

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

  async findAll({
    page,
    limit,
    filter,
  }: ListQuery<KnowledgeObjectRelationFilter>) {
    const skip = (page - 1) * limit;

    const conditions: QueryConditions<KnowledgeObjectRelationConditionShape> =
      {};

    if (filter?.relationType) {
      conditions.relationType = filter.relationType;
    }

    const [relations, total] = await Promise.all([
      KnowledgeObjectRelation.find(conditions)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      KnowledgeObjectRelation.countDocuments(conditions),
    ]);

    return {
      relations,
      total,
    };
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
