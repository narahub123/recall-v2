"use client";

import Link from "next/link";

import { PromptGroupDTO } from "@/dto/prompt-group.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PromptGroupCardProps = {
  promptGroup: PromptGroupDTO;
};

export function PromptGroupCard({ promptGroup }: PromptGroupCardProps) {
  return (
    <Link href={`/admin/prompts/${promptGroup.id}`}>
      <Card className="cursor-pointer transition hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{promptGroup.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {promptGroup.description || "설명이 없습니다."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
