"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { PromptGroupSelect } from "../prompt-group/prompt-group-select";
import { PromptVersionSelect } from "../prompt-version/prompt-version-select";
import { LlmModelSelect } from "@/components/llm/llm-model-select";

import type { LlmModel } from "@/llm/llm-model";
import { LLM_MODELS } from "@/llm/llm-model";

import { useRunKnowledgeObjectRelation } from "@/hooks/knowledge-object-relation-run/mutations/use-run-knowledge-object-relation";

interface Props {
  knowledgeObjectId: string;
}

export function KnowledgeObjectRelationRunSection({
  knowledgeObjectId,
}: Props) {
  const [promptGroupId, setPromptGroupId] = useState("");

  const [promptVersionId, setPromptVersionId] = useState("");

  const [model, setModel] = useState<LlmModel>(LLM_MODELS.GPT_4O_MINI);

  const { mutate, isPending } = useRunKnowledgeObjectRelation();

  function handleRun() {
    if (!promptVersionId) {
      return;
    }

    mutate({
      knowledgeObjectId,

      promptVersionId,

      model,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Object Relation 생성</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            선택한 Prompt와 LLM을 이용하여 관계를 분석합니다.
          </p>
        </div>

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

        <div className="space-y-2">
          <Label>LLM Model</Label>

          <LlmModelSelect value={model} onChange={setModel} />
        </div>

        <div className="flex justify-end">
          <Button disabled={!promptVersionId || isPending} onClick={handleRun}>
            {isPending ? "분석 중..." : "관계 분석 실행"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
