"use client";

import { usePromptGroups } from "@/hooks/prompt-group/queries/use-prompt-groups";

import { PromptGroupList } from "./prompt-group-list";

export function PromptGroupClient() {
  const { data: promptGroups, isLoading, isError } = usePromptGroups();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>불러오기에 실패했습니다.</div>;
  }

  return <PromptGroupList promptGroups={promptGroups ?? []} />;
}
