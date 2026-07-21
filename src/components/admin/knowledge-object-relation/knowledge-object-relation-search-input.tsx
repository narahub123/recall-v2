"use client";

import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS,
  type KnowledgeObjectRelationSearch,
  type KnowledgeObjectRelationSearchField,
} from "@/types/knowledge-object-relation/search";

interface Props {
  value?: KnowledgeObjectRelationSearch;

  onChange: (value?: KnowledgeObjectRelationSearch) => void;
}

const SEARCH_FIELD_LABELS: Record<KnowledgeObjectRelationSearchField, string> =
  {
    sourceKnowledgeObjectName: "Source Knowledge Object",

    targetKnowledgeObjectName: "Target Knowledge Object",
  };

export function KnowledgeObjectRelationSearchInput({ value, onChange }: Props) {
  const [field, setField] = useState<KnowledgeObjectRelationSearchField>(
    value?.field ?? "sourceKnowledgeObjectName",
  );

  const [keyword, setKeyword] = useState(value?.keyword ?? "");

  useEffect(() => {
    setField(value?.field ?? "sourceKnowledgeObjectName");

    setKeyword(value?.keyword ?? "");
  }, [value]);

  function handleSearch() {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      onChange(undefined);

      return;
    }

    onChange({
      field,

      keyword: trimmedKeyword,
    });
  }

  function handleClear() {
    setKeyword("");

    onChange(undefined);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={field}
        onValueChange={(value) => {
          setField(value as KnowledgeObjectRelationSearchField);
        }}
      >
        <SelectTrigger className="w-55">
          <SelectValue placeholder="Search field" />
        </SelectTrigger>

        <SelectContent>
          {KNOWLEDGE_OBJECT_RELATION_SEARCH_FIELDS.map((field) => (
            <SelectItem key={field} value={field}>
              {SEARCH_FIELD_LABELS[field]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Input
          value={keyword}
          placeholder="Search..."
          className="w-65 pr-8"
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />

        {keyword && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
            onClick={handleClear}
          >
            <X />
          </Button>
        )}
      </div>

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={handleSearch}
      >
        <Search />
      </Button>
    </div>
  );
}
