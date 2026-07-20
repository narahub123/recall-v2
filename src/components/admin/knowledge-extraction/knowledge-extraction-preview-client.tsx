"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCreateKnowledgeExtraction } from "@/hooks/knowledge-extraction/mutations/use-create-knowledge-extraction";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";

interface KnowledgeExtractionPreview {
  noteId: string;

  noteTitle?: string;

  promptVersionId: string;

  promptGroupName?: string;

  promptVersion?: number;

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
}

export function KnowledgeExtractionPreviewClient() {
  const router = useRouter();

  const mutation = useCreateKnowledgeExtraction();

  const [data, setData] = useState<KnowledgeExtractionPreview | null>(null);

  useEffect(() => {
    const value = sessionStorage.getItem("knowledge-extraction-preview");

    if (!value) {
      return;
    }

    setData(JSON.parse(value));
  }, []);

  function handleSave() {
    if (!data) {
      return;
    }

    mutation.mutate(data, {
      onSuccess() {
        sessionStorage.removeItem("knowledge-extraction-preview");

        router.push("/admin/knowledge-extractions");
      },
    });
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-6">결과가 없습니다.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <div className="ml-4">
        <AdminBreadcrumb
          items={[
            {
              label: "관리자",
              href: "/admin",
            },
            {
              label: "Knowledge Extraction",
              href: "/admin/knowledge-extractions",
            },
            {
              label: "미리보기",
            },
          ]}
        />
      </div>
      <CardHeader>
        <CardTitle>Knowledge Extraction Preview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2 text-sm">
          <div>Note: {data.noteTitle ?? data.noteId}</div>

          <div>
            Prompt:{" "}
            {data.promptGroupName
              ? `${data.promptGroupName} v${data.promptVersion}`
              : data.promptVersionId}
          </div>

          <div>Model: {data.model}</div>

          <div>Temperature: {data.temperature}</div>

          <div>Response Format: {data.responseFormat}</div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Usage</h3>

          <div className="text-sm space-y-1">
            <div>Input: {data.usage.inputTokens}</div>

            <div>Output: {data.usage.outputTokens}</div>

            <div>Total: {data.usage.totalTokens}</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Knowledge Objects</h3>

          <div className="space-y-4">
            {data.result.knowledge_objects.map((object, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <div className="font-medium">{object.name}</div>

                  <div className="text-sm">{object.description}</div>

                  <div className="text-sm text-muted-foreground">
                    {object.reason}
                  </div>

                  {object.parent && (
                    <div className="text-sm">Parent: {object.parent}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
