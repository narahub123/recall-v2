import { KnowledgeRelationType } from "@/constants/knowledge-object-relation";
import { KnowledgeObjectRelation } from "@/models/knowledge-object-relation.model";
import type {
  KnowledgeObjectRelationDateField,
  KnowledgeObjectRelationFilter,
} from "@/types/knowledge-object-relation/filter";
import type { KnowledgeObjectRelationSearch } from "@/types/knowledge-object-relation/search";
import type { ListQuery } from "@/types/list-query";
import type { QueryConditions } from "@/types/query-conditions";
import { PipelineStage } from "mongoose";

export interface KnowledgeObjectRelationConditionShape {
  relationType?:
    | KnowledgeRelationType
    | {
        $in: KnowledgeRelationType[];
      };

  confidence?: {
    $gte?: number;

    $lte?: number;
  };

  createdAt?: {
    $gte?: Date;

    $lt?: Date;
  };

  updatedAt?: {
    $gte?: Date;

    $lt?: Date;
  };
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
    search,
  }: ListQuery<KnowledgeObjectRelationFilter, KnowledgeObjectRelationSearch>) {
    const skip = (page - 1) * limit;

    const conditions: QueryConditions<KnowledgeObjectRelationConditionShape> =
      {};

    const relationTypes = filter?.relationTypes?.filter(
      (type) => type !== "all",
    );

    if (relationTypes && relationTypes.length > 0) {
      conditions.relationType = {
        $in: relationTypes,
      };
    }

    const confidenceRange = filter?.numberRanges?.find(
      (range) =>
        range.field === "confidence" &&
        (range.min !== undefined || range.max !== undefined),
    );

    if (confidenceRange) {
      conditions.confidence = {};

      if (confidenceRange.min !== undefined) {
        conditions.confidence.$gte = confidenceRange.min;
      }

      if (confidenceRange.max !== undefined) {
        conditions.confidence.$lte = confidenceRange.max;
      }
    }

    const dateRange = filter?.dateRanges?.find(
      (range) =>
        range.field && (range.from !== undefined || range.to !== undefined),
    );

    if (dateRange?.field) {
      const dateField = dateRange.field as KnowledgeObjectRelationDateField;

      conditions[dateField] = {};

      if (dateRange.from) {
        conditions[dateField].$gte = dateRange.from;
      }

      if (dateRange.to) {
        const endDate = new Date(dateRange.to);

        endDate.setDate(endDate.getDate() + 1);

        conditions[dateField].$lt = endDate;
      }
    }

    const pipeline: PipelineStage[] = [
      {
        $match: conditions,
      },

      {
        $addFields: {
          sourceKnowledgeObjectObjectId: {
            $toObjectId: "$sourceKnowledgeObjectId",
          },

          targetKnowledgeObjectObjectId: {
            $toObjectId: "$targetKnowledgeObjectId",
          },
        },
      },

      {
        $lookup: {
          from: "knowledge_objects",

          localField: "sourceKnowledgeObjectObjectId",

          foreignField: "_id",

          as: "sourceKnowledgeObject",
        },
      },

      {
        $lookup: {
          from: "knowledge_objects",

          localField: "targetKnowledgeObjectObjectId",

          foreignField: "_id",

          as: "targetKnowledgeObject",
        },
      },

      {
        $unwind: {
          path: "$sourceKnowledgeObject",

          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$targetKnowledgeObject",

          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (search?.field && search.keyword) {
      pipeline.push({
        $match: {
          [search.field === "sourceKnowledgeObjectName"
            ? "sourceKnowledgeObject.name"
            : "targetKnowledgeObject.name"]: {
            $regex: search.keyword,

            $options: "i",
          },
        },
      });
    }

    const [relations, total] = await Promise.all([
      KnowledgeObjectRelation.aggregate([
        ...pipeline,

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $skip: skip,
        },

        {
          $limit: limit,
        },
      ]),

      KnowledgeObjectRelation.aggregate([
        ...pipeline,

        {
          $count: "total",
        },
      ]),
    ]);

    return {
      relations,

      total: total[0]?.total ?? 0,
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
