"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useKnowledgeExtractions } from "@/hooks/knowledge-extraction/queries/use-knowledge-extractions";

import { formatDate } from "@/lib/date/format-date";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function KnowledgeExtractionSelect({ value, onChange }: Props) {
  const { data: extractions } = useKnowledgeExtractions();

  const selectedExtraction = extractions?.find(
    (extraction) => extraction.id === value,
  );

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value ?? "");
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {selectedExtraction ? (
            <div className="flex flex-col text-left">
              <span className="truncate">
                {selectedExtraction.note.title ?? "제목 없음"}
              </span>

              <span className="text-xs text-muted-foreground">
                {selectedExtraction.promptGroup.name} v
                {selectedExtraction.promptVersion.version}
                {" · "}
                {formatDate(selectedExtraction.createdAt)}
              </span>
            </div>
          ) : (
            "Knowledge Extraction 선택"
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {extractions?.map((extraction) => (
          <SelectItem key={extraction.id} value={extraction.id}>
            <div className="flex flex-col">
              <span className="truncate">
                {extraction.note.title ?? "제목 없음"}
              </span>

              <span className="text-xs text-muted-foreground">
                {extraction.promptGroup.name} v
                {extraction.promptVersion.version}
                {" · "}
                {formatDate(extraction.createdAt)}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
