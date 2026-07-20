"use client";

import Link from "next/link";

import type { KnowledgeObjectGenerationViewDTO } from "@/dto/knowledge-object-generation-view.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  generation: KnowledgeObjectGenerationViewDTO;
}

export function KnowledgeObjectGenerationCard({ generation }: Props) {
  return (
    <Link href={`/admin/knowledge-object-generations/${generation.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>Knowledge Object Generation</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground">노트</div>

            <div className="text-sm font-medium">{generation.note.title}</div>
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

          <div>
            <div className="text-xs text-muted-foreground">Embedding Model</div>

            <div className="text-sm">{generation.embeddingModel}</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Objects</div>

              <div className="text-sm">
                {generation.knowledgeObjects.length}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Tokens</div>

              <div className="text-sm">
                {generation.usage.totalTokens.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">Status</div>

              <div className="text-sm">{generation.status}</div>
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
