import { PromptVersionDTO } from "@/dto/prompt-version.dto";

import { PromptVersionCard } from "./prompt-version-card";

type PromptVersionListProps = {
  versions: PromptVersionDTO[];
};

export function PromptVersionList({ versions }: PromptVersionListProps) {
  if (versions.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Prompt Version이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {versions.map((version) => (
        <PromptVersionCard key={version.id} version={version} />
      ))}
    </div>
  );
}
