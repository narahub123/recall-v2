"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { usePromptGroups } from "@/hooks/prompt-group/queries/use-prompt-groups";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export function PromptGroupSelect({ value, onChange }: Props) {
  const { data: promptGroups } = usePromptGroups();

  const selected =
    promptGroups?.find((group) => group.id === value)?.name ??
    "프롬프트 그룹 선택";

  return (
    <div className="space-y-2">
      <Label>Prompt Group</Label>

      <Select
        value={value}
        onValueChange={(next) => {
          onChange(next ?? "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>{selected}</SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {promptGroups?.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
