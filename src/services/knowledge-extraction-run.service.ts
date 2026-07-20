import { KnowledgeExtractionService } from "@/services/knowledge-extraction.service";
import { NoteService } from "@/services/note.service";
import { PromptVersionService } from "@/services/prompt-version.service";

import { convertBlockNoteToLlmText } from "@/lib/blocknote/blocknote-to-llm-text";

import type { LlmClient } from "@/llm/llm-client";

interface KnowledgeExtractionResult {
  knowledge_objects: {
    name: string;
    description: string;
    reason: string;
    parent?: string | null;
  }[];
}

export class KnowledgeExtractionRunService {
  constructor(
    private readonly noteService: NoteService,

    private readonly promptVersionService: PromptVersionService,

    private readonly knowledgeExtractionService: KnowledgeExtractionService,

    private readonly llmClient: LlmClient,
  ) {}

  async preview(data: {
    noteId: string;
    promptVersionId: string;
    model: string;
    temperature?: number;
  }) {
    const note = await this.noteService.getNoteById(data.noteId);

    if (!note) {
      throw new Error("노트를 찾을 수 없습니다.");
    }

    const promptVersion = await this.promptVersionService.getVersionById(
      data.promptVersionId,
    );

    if (!promptVersion) {
      throw new Error("프롬프트 버전을 찾을 수 없습니다.");
    }

    const noteText = convertBlockNoteToLlmText(note.content);

    const prompt = `${promptVersion.content}

노트:

${noteText}`;

    const response = await this.llmClient.generate<KnowledgeExtractionResult>({
      prompt,

      model: data.model,

      temperature: data.temperature ?? 0,

      responseFormat: "json",
    });

    return {
      noteId: data.noteId,

      promptVersionId: data.promptVersionId,

      promptSnapshot: promptVersion.content,

      model: response.metadata.model,

      temperature: response.metadata.temperature,

      responseFormat: response.metadata.responseFormat,

      result: response.result,

      usage: response.usage,
    };
  }

  
}
