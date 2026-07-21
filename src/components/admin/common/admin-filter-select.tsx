"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props<TValue extends string> {
  value?: TValue;

  options: readonly TValue[];

  labels: Record<TValue, string>;

  placeholder?: string;

  onChange: (value?: TValue) => void;
}

export function AdminFilterSelect<TValue extends string>({
  value,
  options,
  labels,
  placeholder = "Filter",
  onChange,
}: Props<TValue>) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value as TValue);
      }}
    >
      <SelectTrigger className="w-55">
        <SelectValue placeholder={placeholder}>
          {value ? labels[value] : placeholder}
        </SelectValue>
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {labels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
