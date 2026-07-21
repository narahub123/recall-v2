import { knowledgeObjectRelationGenerationService } from "@/services/knowledge-object-relation-generation.service";
import { knowledgeObjectRelationService } from "@/services/knowledge-object-relation.service";
import { knowledgeObjectService } from "@/services/knowledge-object.service";
import { promptVersionService } from "@/services/prompt-version.service";

import type { LlmClient } from "@/llm/llm-client";

import type { KnowledgeRelationLlmResult } from "@/types/knowledge-relation.type";

import { KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS } from "@/models/knowledge-object-relation-generation.model";
import { openAiClient } from "@/llm/providers/openai/openai-client";

export class KnowledgeObjectRelationRunService {
  constructor(private readonly llmClient: LlmClient) {}

  async run(data: {
    knowledgeObjectId: string;

    promptVersionId: string;

    model: string;

    temperature?: number;
  }) {
    const knowledgeObject = await knowledgeObjectService.getKnowledgeObjectById(
      data.knowledgeObjectId,
    );

    if (!knowledgeObject) {
      throw new Error("Knowledge Object를 찾을 수 없습니다.");
    }

    const promptVersion = await promptVersionService.getVersionById(
      data.promptVersionId,
    );

    if (!promptVersion) {
      throw new Error("프롬프트 버전을 찾을 수 없습니다.");
    }

    const candidates = await knowledgeObjectService.findSimilarKnowledgeObjects(
      knowledgeObject.embedding,
      knowledgeObject.noteId,
      5,
    );

    const generation =
      await knowledgeObjectRelationGenerationService.createGeneration({
        knowledgeObjectId: knowledgeObject.id,

        promptVersionId: data.promptVersionId,

        promptSnapshot: promptVersion.content,

        model: data.model,

        temperature: data.temperature ?? 0,

        responseFormat: "json",

        candidateKnowledgeObjectIds: candidates.map((candidate) =>
          String(candidate._id),
        ),

        knowledgeObjectRelationIds: [],

        results: [],

        usage: {
          inputTokens: 0,

          outputTokens: 0,

          totalTokens: 0,
        },

        status: KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.PROCESSING,
      });

    const results = [];

    const relationIds: string[] = [];

    let inputTokens = 0;

    let outputTokens = 0;

    let totalTokens = 0;

    for (const candidate of candidates) {
      const prompt = this.createPrompt(
        knowledgeObject,
        candidate,
        promptVersion.content,
      );

      const response =
        await this.llmClient.generate<KnowledgeRelationLlmResult>({
          prompt,

          model: data.model,

          temperature: data.temperature ?? 0,

          responseFormat: "json",
        });

      inputTokens += response.usage.inputTokens;

      outputTokens += response.usage.outputTokens;

      totalTokens += response.usage.totalTokens;

      const result = response.result;

      console.log("Relation LLM Result", {
        source: knowledgeObject.name,

        target: candidate.name,

        result,
      });

      const relationResult = {
        sourceKnowledgeObjectId: knowledgeObject.id,

        targetKnowledgeObjectId: String(candidate._id),

        related: result.related,

        relationType: result.relationType ?? null,

        reason: result.reason ?? null,

        confidence: result.confidence ?? null,
      };

      results.push(relationResult);

      if (!result.related) {
        continue;
      }

      if (
        !result.relationType ||
        !result.reason ||
        result.confidence === undefined
      ) {
        continue;
      }

      const relation = await knowledgeObjectRelationService.createRelation({
        sourceKnowledgeObjectId: knowledgeObject.id,

        targetKnowledgeObjectId: String(candidate._id),

        relationType: result.relationType,

        reason: result.reason,

        confidence: result.confidence,
      });

      relationIds.push(relation.id);

      console.log("Created Knowledge Object Relation", relation);
    }

    console.log("Generation Result", {
      generationId: generation.id,

      results,

      knowledgeObjectRelationIds: relationIds,

      usage: {
        inputTokens,

        outputTokens,

        totalTokens,
      },
    });

    await knowledgeObjectRelationGenerationService.updateGeneration(
      generation.id,
      {
        results,

        knowledgeObjectRelationIds: relationIds,

        usage: {
          inputTokens,

          outputTokens,

          totalTokens,
        },

        status: KNOWLEDGE_OBJECT_RELATION_GENERATION_STATUS.COMPLETED,
      },
    );

    return generation;
  }

  private createPrompt(
    source: {
      name: string;

      description: string;
    },

    target: {
      name: string;

      description: string;
    },

    promptTemplate: string,
  ) {
    return `${promptTemplate}

Source Knowledge Object:

name:
${source.name}

description:
${source.description}


Target Knowledge Object:

name:
${target.name}

description:
${target.description}
`;
  }
}

export const knowledgeObjectRelationRunService =
  new KnowledgeObjectRelationRunService(openAiClient);
