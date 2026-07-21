"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useKnowledgeObjects } from "@/hooks/knowledge-object/queries/use-knowledge-objects";

interface Props {
  value: string;

  onChange: (value: string) => void;

  label?: string;

  showLabel?: boolean;
}

export function KnowledgeObjectSelect({
  value,
  onChange,
  label = "Knowledge Object",
  showLabel = true,
}: Props) {
  const { data: knowledgeObjects } = useKnowledgeObjects();

  const selectedKnowledgeObject = knowledgeObjects?.find(
    (knowledgeObject) => knowledgeObject.id === value,
  );

  return (
    <div className="space-y-2">
      {showLabel && <Label>{label}</Label>}

      <Select
        value={value}
        onValueChange={(next) => {
          onChange(next ?? "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedKnowledgeObject ? (
              <div className="flex flex-col text-left">
                <span className="truncate">{selectedKnowledgeObject.name}</span>
              </div>
            ) : (
              "Knowledge Object 선택"
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {knowledgeObjects?.map((knowledgeObject) => (
            <SelectItem key={knowledgeObject.id} value={knowledgeObject.id}>
              <div className="flex flex-col">
                <span className="truncate">{knowledgeObject.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
