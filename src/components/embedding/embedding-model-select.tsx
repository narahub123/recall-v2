"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { EmbeddingModel } from "@/embedding/embedding-models";
import { EMBEDDING_MODELS } from "@/embedding/embedding-models";

interface Props {
  value: EmbeddingModel;
  onChange: (value: EmbeddingModel) => void;
}

export function EmbeddingModelSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as EmbeddingModel)}
    >
      <SelectTrigger className="w-72">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {Object.values(EMBEDDING_MODELS).map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
