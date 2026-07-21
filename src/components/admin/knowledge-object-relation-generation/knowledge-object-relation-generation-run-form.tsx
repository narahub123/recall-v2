"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { PromptGroupSelect } from "../prompt-group/prompt-group-select";
import { PromptVersionSelect } from "../prompt-version/prompt-version-select";
import { LlmModelSelect } from "@/components/llm/llm-model-select";

import type { LlmModel } from "@/llm/llm-model";
import { LLM_MODELS } from "@/llm/llm-model";

import { useRunKnowledgeObjectRelation } from "@/hooks/knowledge-object-relation-run/mutations/use-run-knowledge-object-relation";
import { KnowledgeObjectSelect } from "../knowledge-object/knowledge-object-select";
import { TemperatureInput } from "@/components/llm/temperature-input";

interface Props {
  onSuccess?: () => void;
}

export function KnowledgeObjectRelationGenerationRunForm({ onSuccess }: Props) {
  const [knowledgeObjectId, setKnowledgeObjectId] = useState("");

  const [promptGroupId, setPromptGroupId] = useState("");

  const [promptVersionId, setPromptVersionId] = useState("");

  const [model, setModel] = useState<LlmModel>(LLM_MODELS.GPT_4O_MINI);

  const [temperature, setTemperature] = useState(0);

  const mutation = useRunKnowledgeObjectRelation();

  function handleSubmit() {
    if (!knowledgeObjectId || !promptVersionId) {
      return;
    }

    mutation.mutate(
      {
        knowledgeObjectId,

        promptVersionId,

        model,

        temperature: Number(temperature),
      },
      {
        onSuccess() {
          onSuccess?.();
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Object Relation 분석 실행</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <KnowledgeObjectSelect
          value={knowledgeObjectId}
          onChange={setKnowledgeObjectId}
        />

        <PromptGroupSelect
          value={promptGroupId}
          onChange={(value) => {
            setPromptGroupId(value);

            setPromptVersionId("");
          }}
        />

        <PromptVersionSelect
          promptGroupId={promptGroupId}
          value={promptVersionId}
          onChange={setPromptVersionId}
        />

        <LlmModelSelect value={model} onChange={setModel} />

        <TemperatureInput value={temperature} onChange={setTemperature} />

        <div className="flex justify-end">
          <Button
            disabled={
              mutation.isPending || !knowledgeObjectId || !promptVersionId
            }
            onClick={handleSubmit}
          >
            {mutation.isPending ? "분석 중..." : "관계 분석 실행"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
