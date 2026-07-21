"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ROUTES } from "@/constants/routes";

import { useKnowledgeObjectRelationGenerationView } from "@/hooks/knowledge-object-relation-generation/queries/use-knowledge-object-relation-generation-view";

import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";
import { KnowledgeObjectRelationGenerationResultList } from "./knowledge-object-relation-generation-result-list";

interface Props {
  id: string;
}

export function KnowledgeObjectRelationGenerationDetail({ id }: Props) {
  const {
    data: generation,
    isLoading,
    isError,
  } = useKnowledgeObjectRelationGenerationView(id);

  const { setDynamicItems } = useAdminBreadcrumb();

  useEffect(() => {
    if (!generation) {
      return;
    }

    setDynamicItems([
      {
        label: generation.knowledgeObject.name,
      },
    ]);
  }, [generation, setDynamicItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !generation) {
    return <div>Knowledge Object Relation Generation을 찾을 수 없습니다.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Object Relation Generation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECTS}/${generation.knowledgeObject.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <p className="text-sm text-muted-foreground">Knowledge Object</p>

            <p className="font-medium">{generation.knowledgeObject.name}</p>
          </Link>

          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${generation.promptGroup.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <p className="text-sm text-muted-foreground">Prompt Group</p>

            <p>{generation.promptGroup.name}</p>
          </Link>

          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${generation.promptGroup.id}/versions/${generation.promptVersion.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <p className="text-sm text-muted-foreground">Prompt Version</p>

            <p>v{generation.promptVersion.version}</p>
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Model</p>

            <p>{generation.model}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Temperature</p>

            <p>{generation.temperature}</p>
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

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Input Tokens</p>

              <p>{generation.usage.inputTokens.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Output Tokens</p>

              <p>{generation.usage.outputTokens.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Total Tokens</p>

              <p>{generation.usage.totalTokens.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Candidate Knowledge Objects
          </p>

          <div className="space-y-2">
            {generation.candidateKnowledgeObjects.map((item) => (
              <Link
                key={item.id}
                href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECTS}/${item.id}`}
                className="block rounded-md border p-3 text-sm hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <KnowledgeObjectRelationGenerationResultList
          results={generation.results}
        />

        {generation.errorMessage && (
          <div>
            <p className="mb-1 text-sm text-destructive">Error</p>

            <p className="text-sm">{generation.errorMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
