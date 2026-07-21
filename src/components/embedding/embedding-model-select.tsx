"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import type { EmbeddingModel } from "@/embedding/embedding-models";
import { EMBEDDING_MODELS } from "@/embedding/embedding-models";

interface Props {
  value: EmbeddingModel;

  onChange: (value: EmbeddingModel) => void;

  label?: string;

  showLabel?: boolean;
}

export function EmbeddingModelSelect({
  value,
  onChange,
  label = "Embedding Model",
  showLabel = true,
}: Props) {
  return (
    <div className="space-y-2">
      {showLabel && <Label>{label}</Label>}

      <Select
        value={value}
        onValueChange={(next) => {
          onChange(next as EmbeddingModel);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {Object.values(EMBEDDING_MODELS).map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
