"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useKnowledgeObjectGeneration } from "@/hooks/knowledge-object-generation/queries/use-knowledge-object-generation";

import { KnowledgeObjectGenerationObjectList } from "./knowledge-object-generation-object-list";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";
import { useEffect } from "react";

interface Props {
  id: string;
}

export function KnowledgeObjectGenerationDetail({ id }: Props) {
  const {
    data: generation,
    isLoading,
    isError,
  } = useKnowledgeObjectGeneration(id);

  const { setDynamicItems } = useAdminBreadcrumb();

  useEffect(() => {
    if (!generation) {
      return;
    }

    setDynamicItems([
      {
        label: generation.note.title ?? "상세",
      },
    ]);
  }, [generation, setDynamicItems]);

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
          <Link
            href={`${ROUTES.NOTES}/${generation.note.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
            title={`${generation.note.title}로 이동하기`}
          >
            <p className="text-sm text-muted-foreground">노트</p>

            <p className="font-medium">{generation.note.title}</p>
          </Link>

          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${generation.promptGroup.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
            title={`${generation.promptGroup.name}로 이동하기`}
          >
            <p className="text-sm text-muted-foreground">Prompt Group</p>

            <p>{generation.promptGroup.name}</p>
          </Link>

          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${generation.promptGroup.id}/versions/${generation.promptVersion.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
            title={`${generation.promptGroup.name} v${generation.promptVersion.version}로 이동하기`}
          >
            <p className="text-sm text-muted-foreground">Prompt Version</p>

            <p>v{generation.promptVersion.version}</p>
          </Link>

          <Link
            href={`${ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS}/${generation.extractionId}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
            title={`${generation.note.title} 지식 추출 결과로 이동하기`}
          >
            <p className="text-sm text-muted-foreground">
              Knowledge Extraction
            </p>

            <p>{generation.note.title} extraction</p>
          </Link>

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
