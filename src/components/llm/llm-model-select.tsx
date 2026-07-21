"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import type { LlmModel } from "@/llm/llm-model";
import { LLM_MODELS } from "@/llm/llm-model";

interface Props {
  value: LlmModel;

  onChange: (value: LlmModel) => void;

  label?: string;

  showLabel?: boolean;
}

export function LlmModelSelect({
  value,
  onChange,
  label = "LLM Model",
  showLabel = true,
}: Props) {
  return (
    <div className="space-y-2">
      {showLabel && <Label>{label}</Label>}

      <Select
        value={value}
        onValueChange={(next) => {
          onChange(next as LlmModel);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {Object.values(LLM_MODELS).map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
