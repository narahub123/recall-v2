"use server";

import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";
import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

import { connectMongoDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth/require-admin";

import { KnowledgeExtractionRepository } from "@/repositories/knowledge-extraction.repository";
import { KnowledgeExtractionService } from "@/services/knowledge-extraction.service";

import { KnowledgeExtractionRunService } from "@/services/knowledge-extraction-run.service";

import { NoteRepository } from "@/repositories/note.repository";
import { PromptVersionRepository } from "@/repositories/prompt-version.repository";

import { NoteService } from "@/services/note.service";
import {
  promptVersionService,
  PromptVersionService,
} from "@/services/prompt-version.service";
import { openAiClient } from "@/llm/providers/openai/openai-client";
import { PromptGroupService } from "@/services/prompt-group.service";
import { PromptGroupRepository } from "@/repositories/prompt-group.repository";
import { KnowledgeExtractionViewDTO } from "@/dto/knowledge-extraction-view.dto";
import { KnowledgeExtractionViewMapper } from "@/mappers/knowledge-extraction-view.mapper";

const knowledgeExtractionService = new KnowledgeExtractionService(
  new KnowledgeExtractionRepository(),
);

const knowledgeExtractionRunService = new KnowledgeExtractionRunService(
  new NoteService(new NoteRepository()),

  new PromptVersionService(new PromptVersionRepository()),

  knowledgeExtractionService,

  openAiClient,
);

const promptGroupService = new PromptGroupService(
  new PromptGroupRepository(),
  promptVersionService,
);

const noteService = new NoteService(new NoteRepository());

export async function createKnowledgeExtractionAction(data: {
  noteId: string;
  promptVersionId: string;
  promptSnapshot: string;
  model: string;
  temperature: number;
  responseFormat: string;
  result: {
    knowledge_objects: {
      name: string;
      description: string;
      reason: string;
      parent?: string | null;
    }[];
  };
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.createExtraction(data);
}

export async function getKnowledgeExtractionAction(
  id: string,
): Promise<KnowledgeExtractionDetailDTO | null> {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.getExtractionById(id);
}

export async function getKnowledgeExtractionViewAction(
  id: string,
): Promise<KnowledgeExtractionViewDTO | null> {
  await connectMongoDB();

  await requireAdmin();

  const extraction = await knowledgeExtractionService.getExtractionById(id);

  if (!extraction) {
    return null;
  }

  const note = await noteService.getNoteById(extraction.noteId);

  const promptVersion = await promptVersionService.getVersionById(
    extraction.promptVersionId,
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

  return KnowledgeExtractionViewMapper.toDTO(
    extraction,
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
  );
}

export async function getKnowledgeExtractionsAction(): Promise<
  KnowledgeExtractionDTO[]
> {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.getExtractions();
}

export async function getKnowledgeExtractionsViewAction(): Promise<
  KnowledgeExtractionViewDTO[]
> {
  await connectMongoDB();

  await requireAdmin();

  const extractions = await knowledgeExtractionService.getExtractionDetails();

  const result: KnowledgeExtractionViewDTO[] = [];

  for (const extraction of extractions) {
    const note = await noteService.getNoteById(extraction.noteId);

    const promptVersion = await promptVersionService.getVersionById(
      extraction.promptVersionId,
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

    result.push(
      KnowledgeExtractionViewMapper.toDTO(
        extraction,
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
      ),
    );
  }

  return result;
}

export async function updateKnowledgeExtractionAction(
  id: string,
  data: {
    promptSnapshot?: string;
    model?: string;
    temperature?: number;
    responseFormat?: string;
    result?: {
      knowledge_objects: {
        name: string;
        description: string;
        reason: string;
        parent?: string | null;
      }[];
    };
    usage?: {
      inputTokens: number;
      outputTokens: number;
      totalTokens: number;
    };
  },
) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.updateExtraction(id, data);
}

export async function deleteKnowledgeExtractionAction(id: string) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionService.deleteExtraction(id);
}

export async function runKnowledgeExtractionAction(data: {
  noteId: string;

  promptVersionId: string;

  model: string;

  temperature?: number;
}) {
  await connectMongoDB();

  await requireAdmin();

  return knowledgeExtractionRunService.preview(data);
}
