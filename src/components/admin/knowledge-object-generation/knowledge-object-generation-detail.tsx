"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useKnowledgeObjectGeneration } from "@/hooks/knowledge-object-generation/queries/use-knowledge-object-generation";

import { KnowledgeObjectGenerationObjectList } from "./knowledge-object-generation-object-list";

interface Props {
  id: string;
}

export function KnowledgeObjectGenerationDetail({ id }: Props) {
  const {
    data: generation,
    isLoading,
    isError,
  } = useKnowledgeObjectGeneration(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !generation) {
    return <div>Knowledge Object Generation을 찾을 수 없습니다.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Object Generation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">노트</p>

            <p className="font-medium">{generation.note.title}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Prompt Group</p>

            <p>{generation.promptGroup.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Prompt Version</p>

            <p>v{generation.promptVersion.version}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Embedding Model</p>

            <p>{generation.embeddingModel}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <p>{generation.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Created At</p>

            <p>{new Date(generation.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">Usage</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Input Tokens</p>

              <p>{generation.usage.inputTokens.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Total Tokens</p>

              <p>{generation.usage.totalTokens.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {generation.errorMessage && (
          <div>
            <p className="mb-1 text-sm text-destructive">Error</p>

            <p className="text-sm">{generation.errorMessage}</p>
          </div>
        )}

        <KnowledgeObjectGenerationObjectList
          knowledgeObjects={generation.knowledgeObjects}
        />
      </CardContent>
    </Card>
  );
}
