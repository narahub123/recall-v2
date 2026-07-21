"use client";

import Link from "next/link";

import type { KnowledgeObjectRelationGenerationViewDTO } from "@/dto/knowledge-object-relation-generation-view.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

interface Props {
  generation: KnowledgeObjectRelationGenerationViewDTO;
}

export function KnowledgeObjectRelationGenerationCard({ generation }: Props) {
  return (
    <Link
      href={`${ROUTES.ADMIN.KNOWLEDGE_OBJECT_RELATION_GENERATIONS}/${generation.id}`}
    >
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>Knowledge Object Relation Generation</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground">
              Knowledge Object
            </div>

            <div className="text-sm font-medium">
              {generation.knowledgeObject.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Prompt Group</div>

              <div className="text-sm">{generation.promptGroup.name}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Version</div>

              <div className="text-sm">v{generation.promptVersion.version}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Candidates</div>

              <div className="text-sm">
                {generation.candidateKnowledgeObjects.length}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Relations</div>

              <div className="text-sm">
                {generation.results.filter((result) => result.related).length}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Status</div>

              <div className="text-sm">{generation.status}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Model</div>

              <div className="text-sm">{generation.model}</div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Tokens</div>

              <div className="text-sm">
                {generation.usage.totalTokens.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            {new Date(generation.createdAt).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
