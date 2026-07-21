import { PromptGroupDTO } from "@/dto/prompt-group.dto";

import { PromptGroupCard } from "./prompt-group-card";

type PromptGroupListProps = {
  promptGroups: PromptGroupDTO[];
};

export function PromptGroupList({ promptGroups }: PromptGroupListProps) {
  if (promptGroups.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Prompt Group이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col">
      {promptGroups.map((promptGroup) => (
        <PromptGroupCard key={promptGroup.id} promptGroup={promptGroup} />
      ))}
    </div>
  );
}
