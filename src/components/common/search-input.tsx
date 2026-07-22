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

interface SearchValue<TField extends string> {
  field: TField;

  keyword: string;
}

interface Props<TField extends string> {
  fields: readonly TField[];

  labels: Record<TField, string>;

  value?: SearchValue<TField>;

  onChange: (value?: SearchValue<TField>) => void;
}

export function SearchInput<TField extends string>({
  fields,
  labels,
  value,
  onChange,
}: Props<TField>) {
  const [field, setField] = useState<TField | undefined>(value?.field);

  const [keyword, setKeyword] = useState(value?.keyword ?? "");

  useEffect(() => {
    setField(value?.field ?? undefined);

    setKeyword(value?.keyword ?? "");
  }, [value, fields]);

  function handleSearch() {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword || !field) {
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
        value={field ?? ""}
        onValueChange={(value) => {
          setField(value as TField);
        }}
      >
        <SelectTrigger className="w-55">
          <SelectValue placeholder="Search field">
            {field ? labels[field] : "Search field"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {fields.map((field) => (
            <SelectItem key={field} value={field}>
              {labels[field]}
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
