import { KnowledgeObjectRelationGeneration } from "@/models/knowledge-object-relation-generation.model";
import { KnowledgeObjectRelationGenerationStatus } from "@/types/knowledge-object-relation-generation";

import { ListQuery } from "@/types/list-query";
import {
  KnowledgeObjectRelationGenerationDateField,
  KnowledgeObjectRelationGenerationFilter,
} from "@/types/knowledge-object-relation-generation/filter";
import { KnowledgeObjectRelationGenerationSearch } from "@/types/knowledge-object-relation-generation/search";
import { QueryConditions } from "@/types/query-conditions";

export interface KnowledgeObjectRelationGenerationConditionShape {
  status?: {
    $in: KnowledgeObjectRelationGenerationStatus[];
  };

  model?: {
    $in: string[];
  };

  temperature?: {
    $gte?: number;

    $lte?: number;
  };

  errorMessage?: null | {
    $ne: null;
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

export class KnowledgeObjectRelationGenerationRepository {
  async create(data: {
    knowledgeObjectId: string;

    promptVersionId: string;

    promptSnapshot: string;

    model: string;

    temperature: number;

    responseFormat: string;

    candidateKnowledgeObjectIds: string[];

    knowledgeObjectRelationIds: string[];

    results: {
      sourceKnowledgeObjectId: string;

      targetKnowledgeObjectId: string;

      related: boolean;

      relationType?: string | null;

      reason?: string | null;

      confidence?: number | null;
    }[];

    usage: {
      inputTokens: number;

      outputTokens: number;

      totalTokens: number;
    };

    status: KnowledgeObjectRelationGenerationStatus;

    errorMessage?: string | null;
  }) {
    return KnowledgeObjectRelationGeneration.create(data);
  }

  async findById(id: string) {
    return KnowledgeObjectRelationGeneration.findById(id).lean();
  }

  async findAll({
    page,

    limit,

    filter,
  }: ListQuery<
    KnowledgeObjectRelationGenerationFilter,
    KnowledgeObjectRelationGenerationSearch
  >) {
    const skip = (page - 1) * limit;

    const conditions: QueryConditions<KnowledgeObjectRelationGenerationConditionShape> =
      {};

    const statuses = filter?.statuses?.filter((status) => status !== "all");

    if (statuses && statuses.length > 0) {
      conditions.status = {
        $in: statuses,
      };
    }

    const models = filter?.models?.filter((model) => model !== "all");

    if (models && models.length > 0) {
      conditions.model = {
        $in: models,
      };
    }

    const temperatureRange = filter?.numberRanges?.find(
      (range) =>
        range.field === "temperature" &&
        (range.min !== undefined || range.max !== undefined),
    );

    if (temperatureRange) {
      conditions.temperature = {};

      if (temperatureRange.min !== undefined) {
        conditions.temperature.$gte = temperatureRange.min;
      }

      if (temperatureRange.max !== undefined) {
        conditions.temperature.$lte = temperatureRange.max;
      }
    }

    const dateRange = filter?.dateRanges?.find(
      (range) =>
        range.field && (range.from !== undefined || range.to !== undefined),
    );

    if (dateRange?.field) {
      const dateField =
        dateRange.field as KnowledgeObjectRelationGenerationDateField;

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

    if (filter?.errorStatus === "hasError") {
      conditions.errorMessage = {
        $ne: null,
      };
    }

    if (filter?.errorStatus === "noError") {
      conditions.errorMessage = null;
    }

    const [generations, total] = await Promise.all([
      KnowledgeObjectRelationGeneration.find(conditions)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      KnowledgeObjectRelationGeneration.countDocuments(conditions),
    ]);

    return {
      generations,

      total,
    };
  }

  async findByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelationGeneration.find({
      knowledgeObjectId,
    }).sort({
      createdAt: -1,
    });
  }

  async findByPromptVersionId(promptVersionId: string) {
    return KnowledgeObjectRelationGeneration.find({
      promptVersionId,
    }).sort({
      createdAt: -1,
    });
  }

  async update(
    id: string,

    data: {
      results?: {
        sourceKnowledgeObjectId: string;

        targetKnowledgeObjectId: string;

        related: boolean;

        relationType?: string | null;

        reason?: string | null;

        confidence?: number | null;
      }[];

      knowledgeObjectRelationIds?: string[];

      usage?: {
        inputTokens: number;

        outputTokens: number;

        totalTokens: number;
      };

      status?: KnowledgeObjectRelationGenerationStatus;

      errorMessage?: string | null;
    },
  ) {
    return KnowledgeObjectRelationGeneration.findByIdAndUpdate(
      id,

      data,

      {
        new: true,
      },
    );
  }

  async delete(id: string) {
    return KnowledgeObjectRelationGeneration.findByIdAndDelete(id);
  }

  async deleteByKnowledgeObjectId(knowledgeObjectId: string) {
    return KnowledgeObjectRelationGeneration.deleteMany({
      knowledgeObjectId,
    });
  }
}

export const knowledgeObjectRelationGenerationRepository =
  new KnowledgeObjectRelationGenerationRepository();
