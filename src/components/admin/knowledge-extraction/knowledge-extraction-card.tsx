"use client";

import Link from "next/link";

import { KnowledgeExtractionViewDTO } from "@/dto/knowledge-extraction-view.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/date/format-date";

type KnowledgeExtractionCardProps = {
  extraction: KnowledgeExtractionViewDTO;
};

export function KnowledgeExtractionCard({
  extraction,
}: KnowledgeExtractionCardProps) {
  return (
    <Link href={`/admin/knowledge-extractions/${extraction.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{extraction.note.title ?? "제목 없음"}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Model: {extraction.model}
          </p>

          <p className="text-sm text-muted-foreground">
            Prompt: {extraction.promptGroup.name} v
            {extraction.promptVersion.version}
          </p>

          <p className="text-sm text-muted-foreground">
            Created At: {formatDate(extraction.createdAt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
