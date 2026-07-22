"use server";

import { KnowledgeObjectRelationGenerationViewDTO } from "@/dto/knowledge-object-relation-generation-view.dto";
import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongoDB } from "@/lib/mongodb";
import { KnowledgeObjectRelationGenerationViewMapper } from "@/mappers/knowledge-object-relation-generation-view.mapper";

import type { KnowledgeObjectRelationGenerationStatus } from "@/models/knowledge-object-relation-generation.model";

import { knowledgeObjectRelationGenerationService } from "@/services/knowledge-object-relation-generation.service";
import { knowledgeObjectService } from "@/services/knowledge-object.service";
import { promptGroupService } from "@/services/prompt-group.service";
import { promptVersionService } from "@/services/prompt-version.service";
import { KnowledgeObjectRelationGenerationFilter } from "@/types/knowledge-object-relation-generation/filter";
import { KnowledgeObjectRelationGenerationSearch } from "@/types/knowledge-object-relation-generation/search";
import { ListQuery } from "@/types/list-query";

export async function createKnowledgeObjectRelationGenerationAction(data: {
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
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.createGeneration(data);
}

export async function getKnowledgeObjectRelationGenerationAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.getGenerationById(id);
}

export async function getKnowledgeObjectRelationGenerationsAction(
  query: ListQuery<
    KnowledgeObjectRelationGenerationFilter,
    KnowledgeObjectRelationGenerationSearch
  >,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.getGenerations(query);
}

export async function getKnowledgeObjectRelationGenerationsByKnowledgeObjectIdAction(
  knowledgeObjectId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.getGenerationsByKnowledgeObjectId(
    knowledgeObjectId,
  );
}

export async function getKnowledgeObjectRelationGenerationsByPromptVersionIdAction(
  promptVersionId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.getGenerationsByPromptVersionId(
    promptVersionId,
  );
}

export async function updateKnowledgeObjectRelationGenerationAction(
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
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.updateGeneration(id, data);
}

export async function deleteKnowledgeObjectRelationGenerationAction(
  id: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectRelationGenerationService.deleteGeneration(id);
}

export async function getKnowledgeObjectRelationGenerationViewAction(
  id: string,
) {
  await connectMongoDB();

  await requireAdmin();

  const generation =
    await knowledgeObjectRelationGenerationService.getGenerationById(id);

  if (!generation) {
    return null;
  }

  const knowledgeObject = await knowledgeObjectService.getKnowledgeObjectById(
    generation.knowledgeObjectId,
  );

  const promptVersion = await promptVersionService.getVersionById(
    generation.promptVersionId,
  );

  if (!knowledgeObject || !promptVersion) {
    return null;
  }

  const promptGroup = await promptGroupService.getPromptGroupById(
    promptVersion.promptGroupId,
  );

  if (!promptGroup) {
    return null;
  }

  const candidateKnowledgeObjects = await Promise.all(
    generation.candidateKnowledgeObjectIds.map(async (id) => {
      const candidate = await knowledgeObjectService.getKnowledgeObjectById(id);

      if (!candidate) {
        return null;
      }

      return {
        id: candidate.id,

        name: candidate.name,
      };
    }),
  );

  const knowledgeObjectMap = new Map(
    candidateKnowledgeObjects
      .filter(
        (
          item,
        ): item is {
          id: string;

          name: string;
        } => item !== null,
      )
      .map((item) => [item.id, item]),
  );

  const results = generation.results.map((result) => ({
    source: {
      id: result.sourceKnowledgeObjectId,

      name:
        knowledgeObjectMap.get(result.sourceKnowledgeObjectId)?.name ??
        result.sourceKnowledgeObjectId,
    },

    target: {
      id: result.targetKnowledgeObjectId,

      name:
        knowledgeObjectMap.get(result.targetKnowledgeObjectId)?.name ??
        result.targetKnowledgeObjectId,
    },

    related: result.related,

    relationType: result.relationType ?? null,

    reason: result.reason ?? null,

    confidence: result.confidence ?? null,
  }));

  return KnowledgeObjectRelationGenerationViewMapper.toDTO(
    generation,

    {
      id: knowledgeObject.id,

      name: knowledgeObject.name,
    },

    {
      id: promptVersion.id,

      version: promptVersion.version,
    },

    {
      id: promptGroup.id,

      name: promptGroup.name,
    },

    candidateKnowledgeObjects.filter(
      (
        item,
      ): item is {
        id: string;

        name: string;
      } => item !== null,
    ),

    results,
  );
}

export async function getKnowledgeObjectRelationGenerationsViewAction(
  query: ListQuery<
    KnowledgeObjectRelationGenerationFilter,
    KnowledgeObjectRelationGenerationSearch
  >,
) {
  await connectMongoDB();

  await requireAdmin();

  const { items, pagination } =
    await knowledgeObjectRelationGenerationService.getGenerations(query);

  const result: KnowledgeObjectRelationGenerationViewDTO[] = [];

  for (const generation of items) {
    const knowledgeObject = await knowledgeObjectService.getKnowledgeObjectById(
      generation.knowledgeObjectId,
    );

    const promptVersion = await promptVersionService.getVersionById(
      generation.promptVersionId,
    );

    if (!knowledgeObject || !promptVersion) {
      continue;
    }

    const promptGroup = await promptGroupService.getPromptGroupById(
      promptVersion.promptGroupId,
    );

    if (!promptGroup) {
      continue;
    }

    const candidateKnowledgeObjects = await Promise.all(
      generation.candidateKnowledgeObjectIds.map(async (id) => {
        const candidate =
          await knowledgeObjectService.getKnowledgeObjectById(id);

        if (!candidate) {
          return null;
        }

        return {
          id: candidate.id,

          name: candidate.name,
        };
      }),
    );

    const knowledgeObjectMap = new Map(
      candidateKnowledgeObjects
        .filter(
          (
            item,
          ): item is {
            id: string;

            name: string;
          } => item !== null,
        )
        .map((item) => [item.id, item]),
    );

    const results = generation.results.map((relation) => ({
      source: {
        id: relation.sourceKnowledgeObjectId,

        name:
          knowledgeObjectMap.get(relation.sourceKnowledgeObjectId)?.name ??
          relation.sourceKnowledgeObjectId,
      },

      target: {
        id: relation.targetKnowledgeObjectId,

        name:
          knowledgeObjectMap.get(relation.targetKnowledgeObjectId)?.name ??
          relation.targetKnowledgeObjectId,
      },

      related: relation.related,

      relationType: relation.relationType ?? null,

      reason: relation.reason ?? null,

      confidence: relation.confidence ?? null,
    }));

    result.push(
      KnowledgeObjectRelationGenerationViewMapper.toDTO(
        generation,

        {
          id: knowledgeObject.id,

          name: knowledgeObject.name,
        },

        {
          id: promptVersion.id,

          version: promptVersion.version,
        },

        {
          id: promptGroup.id,

          name: promptGroup.name,
        },

        candidateKnowledgeObjects.filter(
          (
            item,
          ): item is {
            id: string;

            name: string;
          } => item !== null,
        ),

        results,
      ),
    );
  }

  return {
    items: result,
    pagination,
  };
}
