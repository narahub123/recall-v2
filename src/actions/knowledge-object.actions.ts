"use server";

import { KnowledgeObjectViewDTO } from "@/dto/knowledge-object-view.dto";

import { EmbeddingModel } from "@/embedding/embedding-models";
import { OpenAiEmbeddingClient } from "@/embedding/providers/openai/openai-embedding-client";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectMongoDB } from "@/lib/mongodb";

import { KnowledgeObjectViewMapper } from "@/mappers/knowledge-object-view.mapper";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeObjectGenerationRepository } from "@/repositories/knowledge-object-generation.repository";
import { KnowledgeObjectRelationRepository } from "@/repositories/knowledge-object-relation.repository";
import { KnowledgeObjectRepository } from "@/repositories/knowledge-object.repository";
import { NoteRepository } from "@/repositories/note.repository";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";
import { PromptVersionRepository } from "@/repositories/prompt-version.repository";

import { KnowledgeExtractionService } from "@/services/knowledge-extraction.service";
import { KnowledgeObjectGenerationService } from "@/services/knowledge-object-generation.service";
import { knowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";
import { knowledgeObjectService, KnowledgeObjectService } from "@/services/knowledge-object.service";
import { NoteService } from "@/services/note.service";
import { PromptGroupService } from "@/services/prompt-group.service";
import { PromptVersionService } from "@/services/prompt-version.service";

const knowledgeObjectRepository = new KnowledgeObjectRepository();


const noteService = new NoteService(new NoteRepository());

const promptVersionService = new PromptVersionService(
  new PromptVersionRepository(),
);

const promptGroupService = new PromptGroupService(
  new PromptGroupRepository(),
  promptVersionService,
);

const knowledgeExtractionService = new KnowledgeExtractionService(
  new KnowledgeExtractionRepository(),
);

const knowledgeObjectGenerationService = new KnowledgeObjectGenerationService(
  new KnowledgeExtractionRepository(),

  knowledgeObjectService,

  new OpenAiEmbeddingClient(),

  new KnowledgeObjectGenerationRepository(),
);

export async function createKnowledgeObjectAction(data: {
  noteId: string;

  extractionId?: string;

  promptVersionId: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  embeddingText: string;

  embeddingModel: EmbeddingModel;

  embedding: number[];
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.createKnowledgeObject(data);
}

export async function getKnowledgeObjectAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectById(id);
}

export async function getKnowledgeObjectViewAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  const knowledgeObject =
    await knowledgeObjectService.getKnowledgeObjectById(id);

  if (!knowledgeObject) {
    return null;
  }

  const note = await noteService.getNoteById(knowledgeObject.noteId);

  const promptVersion = await promptVersionService.getVersionById(
    knowledgeObject.promptVersionId,
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

  let extraction;

  if (knowledgeObject.extractionId) {
    const knowledgeExtraction =
      await knowledgeExtractionService.getExtractionById(
        knowledgeObject.extractionId,
      );

    if (knowledgeExtraction) {
      extraction = {
        id: knowledgeExtraction.id,
        model: knowledgeExtraction.model,
        createdAt: knowledgeExtraction.createdAt,
      };
    }
  }

  return KnowledgeObjectViewMapper.toDTO(
    knowledgeObject,

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

    extraction,
  );
}

export async function getKnowledgeObjectsAction() {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjects();
}

export async function getKnowledgeObjectsViewAction(): Promise<
  KnowledgeObjectViewDTO[]
> {
  await connectMongoDB();

  await requireAdmin();

  const knowledgeObjects = await knowledgeObjectService.getKnowledgeObjects();

  const result: KnowledgeObjectViewDTO[] = [];

  for (const knowledgeObject of knowledgeObjects) {
    const note = await noteService.getNoteById(knowledgeObject.noteId);

    const promptVersion = await promptVersionService.getVersionById(
      knowledgeObject.promptVersionId,
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

    let extraction;

    if (knowledgeObject.extractionId) {
      const knowledgeExtraction =
        await knowledgeExtractionService.getExtractionById(
          knowledgeObject.extractionId,
        );

      if (knowledgeExtraction) {
        extraction = {
          id: knowledgeExtraction.id,
          model: knowledgeExtraction.model,
          createdAt: knowledgeExtraction.createdAt,
        };
      }
    }

    result.push(
      KnowledgeObjectViewMapper.toDTO(
        knowledgeObject,
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
        extraction,
      ),
    );
  }

  return result;
}

export async function getKnowledgeObjectsByNoteIdAction(noteId: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectsByNoteId(noteId);
}

export async function getKnowledgeObjectsByExtractionIdAction(
  extractionId: string,
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.getKnowledgeObjectsByExtractionId(extractionId);
}

export async function updateKnowledgeObjectAction(
  id: string,
  data: {
    name?: string;

    description?: string;

    reason?: string;

    parent?: string | null;

    embeddingText?: string;
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeObjectService.updateKnowledgeObject(id, data);
}

export async function deleteKnowledgeObjectAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  const deleted = await knowledgeObjectService.deleteKnowledgeObject(id);

  if (!deleted) {
    throw new Error("Knowledge Object를 찾을 수 없습니다.");
  }

  await knowledgeObjectRelationService.deleteByKnowledgeObjectId(id);

  return deleted;
}
