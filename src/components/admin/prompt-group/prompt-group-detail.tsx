"use client";

import { useEffect, useState } from "react";

import { usePromptGroup } from "@/hooks/prompt-group/queries/use-prompt-group";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PromptGroupDeleteDialog } from "./prompt-group-delete-dialog";
import { PromptGroupEditForm } from "./prompt-group-edit-form";
import { PromptVersionSection } from "../prompt-version/prompt-version-section";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import { ROUTES } from "@/constants/routes";
import { useAdminBreadcrumb } from "../common/admin-breadcrumb-context";

type PromptGroupDetailProps = {
  id: string;
};

export function PromptGroupDetail({ id }: PromptGroupDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: promptGroup, isLoading, isError } = usePromptGroup(id);

  const { setDynamicItems } = useAdminBreadcrumb();

  useEffect(() => {
    if (!promptGroup) {
      return;
    }

    setDynamicItems([
      {
        label: promptGroup.name ?? "그룹",
      },
    ]);
  }, [promptGroup, setDynamicItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !promptGroup) {
    return <div>Prompt Group을 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <PromptGroupEditForm
        promptGroup={promptGroup}
        onCancel={() => setEditMode(false)}
        onSuccess={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{promptGroup.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>

            <p>{promptGroup.description || "설명이 없습니다."}</p>
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Button variant="outline" onClick={() => setEditMode(true)}>
            수정
          </Button>

          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            삭제
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prompt Versions</CardTitle>
        </CardHeader>

        <CardContent>
          <PromptVersionSection promptGroupId={promptGroup.id} />
        </CardContent>
      </Card>

      <PromptGroupDeleteDialog
        id={promptGroup.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
