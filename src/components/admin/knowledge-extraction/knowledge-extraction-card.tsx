"use client";

import Link from "next/link";

import { KnowledgeExtractionDTO } from "@/dto/knowledge-extraction.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type KnowledgeExtractionCardProps = {
  extraction: KnowledgeExtractionDTO;
};

export function KnowledgeExtractionCard({
  extraction,
}: KnowledgeExtractionCardProps) {
  return (
    <Link href={`/admin/knowledge-extractions/${extraction.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{extraction.model}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Prompt Version ID: {extraction.promptVersionId}
          </p>

          <p className="text-sm text-muted-foreground">
            Note ID: {extraction.noteId}
          </p>

          <p className="text-sm text-muted-foreground">
            Created At: {extraction.createdAt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
