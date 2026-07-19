"use client";

import { usePromptVersions } from "@/hooks/prompt-version/queries/use-prompt-versions";

import { PromptVersionList } from "./prompt-version-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PromptVersionSectionProps = {
  promptGroupId: string;
};

export function PromptVersionSection({
  promptGroupId,
}: PromptVersionSectionProps) {
  const {
    data: versions,
    isLoading,
    isError,
  } = usePromptVersions(promptGroupId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Version 조회 실패</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Link href={`/admin/prompts/${promptGroupId}/versions/new`}>
            Create Version
          </Link>
        </Button>
      </div>

      <PromptVersionList versions={versions ?? []} />
    </div>
  );
}
