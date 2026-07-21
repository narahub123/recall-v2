"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { LlmModel } from "@/llm/llm-model";
import { LLM_MODELS } from "@/llm/llm-model";

interface Props {
  value: LlmModel;

  onChange: (value: LlmModel) => void;
}

export function LlmModelSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as LlmModel)}
    >
      <SelectTrigger className="w-72">
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
  );
}
