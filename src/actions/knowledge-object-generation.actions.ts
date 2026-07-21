"use server";

import { EmbeddingModel } from "@/embedding/embedding-models";

import { KnowledgeObjectGenerationViewMapper } from "@/mappers/knowledge-object-generation-view.mapper";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongoDB } from "@/lib/mongodb";

import { knowledgeObjectGenerationService } from "@/services/knowledge-object-generation.service";
import { knowledgeObjectService } from "@/services/knowledge-object.service";

import { noteService } from "@/services/note.service";
import { promptVersionService } from "@/services/prompt-version.service";
import { promptGroupService } from "@/services/prompt-group.service";

export async function createKnowledgeObjectsFromExtractionAction(
  extractionId: string,

  embeddingModel: EmbeddingModel,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectGenerationService.createFromExtraction(
    extractionId,

    embeddingModel,
  );
}

export async function getKnowledgeObjectGenerationAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectGenerationService.getGenerationById(id);
}

export async function getKnowledgeObjectGenerationsAction() {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectGenerationService.getGenerations();
}

export async function getKnowledgeObjectGenerationViewAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  const generation =
    await knowledgeObjectGenerationService.getGenerationById(id);

  if (!generation) {
    return null;
  }

  const note = await noteService.getNoteById(generation.noteId);

  const promptVersion = await promptVersionService.getVersionById(
    generation.promptVersionId,
  );

  if (!note || !promptVersion) {
    return null;
  }

  const promptGroup = await promptGroupService.getPromptGroupById(
    promptVersion.promptGroupId,
  );

  if (!promptGroup) {
    return null;
  }

  const knowledgeObjects = await Promise.all(
    generation.knowledgeObjectIds.map(async (id) => {
      const knowledgeObject =
        await knowledgeObjectService.getKnowledgeObjectById(id);

      if (!knowledgeObject) {
        return null;
      }

      return {
        id: knowledgeObject.id,

        name: knowledgeObject.name,
      };
    }),
  );

  return KnowledgeObjectGenerationViewMapper.toDTO(
    generation,

    {
      id: note.id,

      title: note.title,
    },

    {
      id: promptVersion.id,

      version: promptVersion.version,
    },

    {
      id: promptGroup.id,

      name: promptGroup.name,
    },

    knowledgeObjects.filter(
      (
        item,
      ): item is {
        id: string;

        name: string;
      } => item !== null,
    ),
  );
}

export async function getKnowledgeObjectGenerationsViewAction() {
  await connectMongoDB();

  await requireAdmin();

  const generations = await knowledgeObjectGenerationService.getGenerations();

  const result = [];

  for (const generation of generations) {
    const note = await noteService.getNoteById(generation.noteId);

    const promptVersion = await promptVersionService.getVersionById(
      generation.promptVersionId,
    );

    if (!note || !promptVersion) {
      continue;
    }

    const promptGroup = await promptGroupService.getPromptGroupById(
      promptVersion.promptGroupId,
    );

    if (!promptGroup) {
      continue;
    }

    const knowledgeObjects = await Promise.all(
      generation.knowledgeObjectIds.map(async (id) => {
        const knowledgeObject =
          await knowledgeObjectService.getKnowledgeObjectById(id);

        if (!knowledgeObject) {
          return null;
        }

        return {
          id: knowledgeObject.id,

          name: knowledgeObject.name,
        };
      }),
    );

    result.push(
      KnowledgeObjectGenerationViewMapper.toDTO(
        generation,

        {
          id: note.id,

          title: note.title,
        },

        {
          id: promptVersion.id,

          version: promptVersion.version,
        },

        {
          id: promptGroup.id,

          name: promptGroup.name,
        },

        knowledgeObjects.filter(
          (
            item,
          ): item is {
            id: string;

            name: string;
          } => item !== null,
        ),
      ),
    );
  }

  console.dir(result, { depth: null });
  return result;
}
