"use client";

import { useState } from "react";

import { PromptGroupDTO } from "@/dto/prompt-group.dto";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PromptGroupDeleteDialog } from "./prompt-group-delete-dialog";
import { PromptGroupEditDialog } from "./prompt-group-edit-dialog";

type PromptGroupCardProps = {
  promptGroup: PromptGroupDTO;
};

export function PromptGroupCard({ promptGroup }: PromptGroupCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{promptGroup.name}</CardTitle>

            <Badge>{promptGroup.key}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {promptGroup.description || "설명이 없습니다."}
          </p>
        </CardContent>

        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            수정
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
          >
            삭제
          </Button>
        </CardFooter>
      </Card>

      <PromptGroupEditDialog
        promptGroup={promptGroup}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <PromptGroupDeleteDialog
        id={promptGroup.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
