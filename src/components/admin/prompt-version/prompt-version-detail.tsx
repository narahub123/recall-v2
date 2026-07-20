"use client";

import { useState } from "react";

import { usePromptVersionDetail } from "@/hooks/prompt-version/queries/use-prompt-version-detail";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import { PromptVersionDeleteDialog } from "./prompt-version-delete-dialog";
import { PromptVersionEditForm } from "./prompt-version-edit-form";

type PromptVersionDetailProps = {
  versionId: string;
};

export function PromptVersionDetail({ versionId }: PromptVersionDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    data: version,
    isLoading,
    isError,
  } = usePromptVersionDetail(versionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !version) {
    return <div>Prompt Version을 찾을 수 없습니다.</div>;
  }

  if (editMode) {
    return (
      <PromptVersionEditForm
        version={version}
        onCancel={() => setEditMode(false)}
        onSuccess={() => setEditMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          {
            label: "Prompts",
            href: "/admin/prompts",
          },
          {
            label: version.promptGroup.name,
            href: `/admin/prompts/${version.promptGroup.id}`,
          },
          {
            label: `Version ${version.version}`,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Version {version.version}</CardTitle>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditMode(true)}>
                수정
              </Button>

              <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <pre className="whitespace-pre-wrap rounded-md border p-4 text-sm">
            {version.content}
          </pre>
        </CardContent>
      </Card>

      <PromptVersionDeleteDialog
        id={version.id}
        promptGroupId={version.promptGroup.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
