"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  KNOWLEDGE_RELATION_TYPES,
  KnowledgeRelationType,
} from "@/constants/knowledge-object-relation";

interface Props {
  value?: KnowledgeRelationType;

  onChange: (value?: KnowledgeRelationType) => void;
}

export function KnowledgeObjectRelationFilterSelect({
  value,
  onChange,
}: Props) {
  return (
    <Select
      value={value ?? "all"}
      onValueChange={(value) => {
        onChange(
          value === "all" ? undefined : (value as KnowledgeRelationType),
        );
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Relation Type" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">전체</SelectItem>

        {KNOWLEDGE_RELATION_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
