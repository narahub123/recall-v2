"use client";

import Link from "next/link";

import { KnowledgeObjectViewDTO } from "@/dto/knowledge-object-view.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  knowledgeObject: KnowledgeObjectViewDTO;
}

export function KnowledgeObjectCard({ knowledgeObject }: Props) {
  return (
    <Link href={`/admin/knowledge-objects/${knowledgeObject.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{knowledgeObject.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {knowledgeObject.description || "설명이 없습니다."}
            </p>

            <div className="text-xs text-muted-foreground">
              Note: {knowledgeObject.note.title ?? "제목 없음"}
            </div>

            <div className="text-xs text-muted-foreground">
              Prompt: {knowledgeObject.promptGroup.name} v
              {knowledgeObject.promptVersion.version}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
