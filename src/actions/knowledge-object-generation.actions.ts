"use server";

import { EmbeddingModel } from "@/embedding/embedding-models";
import { OpenAiEmbeddingClient } from "@/embedding/providers/openai/openai-embedding-client";

import { KnowledgeObjectGenerationViewMapper } from "@/mappers/knowledge-object-generation-view.mapper";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongoDB } from "@/lib/mongodb";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeObjectGenerationRepository } from "@/repositories/knowledge-object-generation.repository";
import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";

import { NoteRepository } from "@/repositories/note.repository";
import { PromptVersionRepository } from "@/repositories/prompt-version.repository";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";

import { KnowledgeObjectGenerationService } from "@/services/knowledge-object-generation.service";
import { KnowledgeObjectService } from "@/services/knowledge-object.service";

import { NoteService } from "@/services/note.service";
import { PromptVersionService } from "@/services/prompt-version.service";
import { PromptGroupService } from "@/services/prompt-group.service";

const knowledgeObjectGenerationService = new KnowledgeObjectGenerationService(
  new KnowledgeExtractionRepository(),

  new KnowledgeObjectService(new KnowledgeObjectRepository()),

  new OpenAiEmbeddingClient(),

  new KnowledgeObjectGenerationRepository(),
);

const knowledgeObjectService = new KnowledgeObjectService(
  new KnowledgeObjectRepository(),
);

const noteService = new NoteService(new NoteRepository());

const promptVersionService = new PromptVersionService(
  new PromptVersionRepository(),
);

const promptGroupService = new PromptGroupService(
  new PromptGroupRepository(),
  promptVersionService,
);

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

  return result;
}
