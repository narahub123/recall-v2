"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { usePromptVersions } from "@/hooks/prompt-version/queries/use-prompt-versions";

interface Props {
  promptGroupId: string;

  value: string;

  onChange: (value: string) => void;
}

export function PromptVersionSelect({ promptGroupId, value, onChange }: Props) {
  const { data: versions } = usePromptVersions(promptGroupId);

  const selected = versions?.find((version) => version.id === value);

  return (
    <div className="space-y-2">
      <Label>Prompt Version</Label>

      <Select
        value={value}
        disabled={!promptGroupId}
        onValueChange={(next) => {
          onChange(next ?? "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {selected ? `v${selected.version}` : "프롬프트 버전 선택"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {versions?.map((version) => (
            <SelectItem key={version.id} value={version.id}>
              v{version.version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
