"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { NumberRangeOption, NumberRangeValue } from "@/types/filter";

interface Props {
  value: NumberRangeValue;

  options: readonly NumberRangeOption[];

  inputMin?: number;

  inputMax?: number;

  step?: number;

  minPlaceholder?: string;

  maxPlaceholder?: string;

  onChange: (value: NumberRangeValue) => void;
}

export function NumberRangeInput({
  value,
  options,
  inputMin,
  inputMax,
  step = 1,
  minPlaceholder = "최소",
  maxPlaceholder = "최대",
  onChange,
}: Props) {
  function handleFieldChange(field: string | null) {
    if (!field) {
      return;
    }

    onChange({
      field,
    });
  }

  function handleMinChange(inputValue: string) {
    onChange({
      ...value,
      min: inputValue === "" ? undefined : Number(inputValue),
    });
  }

  function handleMaxChange(inputValue: string) {
    onChange({
      ...value,
      max: inputValue === "" ? undefined : Number(inputValue),
    });
  }

  const disabled = !value.field;

  return (
    <div className="flex items-center gap-2">
      <Select value={value.field ?? ""} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-32">
          <SelectValue>
            {options.find((option) => option.value === value.field)?.label ??
              "항목 선택"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        min={inputMin}
        max={inputMax}
        step={step}
        placeholder={minPlaceholder}
        value={value.min ?? ""}
        disabled={disabled}
        onChange={(event) => {
          handleMinChange(event.target.value);
        }}
        className="w-24"
      />

      <span className="text-muted-foreground">~</span>

      <Input
        type="number"
        min={inputMin}
        max={inputMax}
        step={step}
        placeholder={maxPlaceholder}
        value={value.max ?? ""}
        disabled={disabled}
        onChange={(event) => {
          handleMaxChange(event.target.value);
        }}
        className="w-24"
      />
    </div>
  );
}
