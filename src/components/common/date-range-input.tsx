"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { DateRangeOption, DateRangeValue } from "@/types/filter";

interface Props {
  value: DateRangeValue;

  options: readonly DateRangeOption[];

  placeholder?: string;

  onChange: (value: DateRangeValue) => void;
}

export function DateRangeInput({
  value,
  options,
  placeholder = "날짜 선택",
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

  function handleFromChange(date?: Date) {
    onChange({
      ...value,
      from: date,

      to: value.to && date && value.to < date ? undefined : value.to,
    });
  }

  function handleToChange(date?: Date) {
    onChange({
      ...value,
      to: date,

      from: value.from && date && value.from > date ? undefined : value.from,
    });
  }

  const disabled = !value.field;

  const fieldLabel =
    options.find((option) => option.value === value.field)?.label ??
    "항목 선택";

  return (
    <div className="flex items-center gap-2">
      <Select value={value.field ?? ""} onValueChange={handleFieldChange}>
        <SelectTrigger className="w-32">
          <SelectValue>{fieldLabel}</SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePickerButton
        value={value.from}
        disabled={disabled}
        placeholder={placeholder}
        maxDate={value.to}
        onChange={handleFromChange}
      />

      <span className="text-muted-foreground">~</span>

      <DatePickerButton
        value={value.to}
        disabled={disabled}
        placeholder={placeholder}
        minDate={value.from}
        onChange={handleToChange}
      />
    </div>
  );
}

interface DatePickerButtonProps {
  value?: Date;

  disabled?: boolean;

  placeholder: string;

  minDate?: Date;

  maxDate?: Date;

  onChange: (date?: Date) => void;
}

function DatePickerButton({
  value,
  disabled,
  placeholder,
  minDate,
  maxDate,
  onChange,
}: DatePickerButtonProps) {
  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        className="flex w-36 items-center justify-start rounded-md border px-3 py-2 text-left text-sm font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />

        {value ? format(value, "yyyy-MM-dd") : placeholder}
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          disabled={(date) => {
            if (minDate && date < minDate) {
              return true;
            }

            if (maxDate && date > maxDate) {
              return true;
            }

            return false;
          }}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
