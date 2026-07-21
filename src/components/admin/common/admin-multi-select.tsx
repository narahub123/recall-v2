"use client";

import { ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props<TValue extends string> {
  value: TValue[];

  options: readonly TValue[];

  labels: Record<TValue, string>;

  badgeColors?: Partial<Record<TValue, string>>;

  placeholder?: string;

  onChange: (value: TValue[]) => void;
}

export function AdminMultiSelect<TValue extends string>({
  value,
  options,
  labels,
  badgeColors,
  placeholder = "선택",
  onChange,
}: Props<TValue>) {
  function toggleValue(option: TValue) {
    const isAll = option === "all";

    if (isAll) {
      onChange(["all" as TValue]);

      return;
    }

    const values = value.filter((item) => item !== ("all" as TValue));

    if (values.includes(option)) {
      onChange(values.filter((item) => item !== option));

      return;
    }

    onChange([...values, option]);
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="w-55 justify-between"
          />
        }
      >
        <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
          {value.length === 0 ? (
            <span className="truncate text-muted-foreground">
              {placeholder}
            </span>
          ) : (
            <>
              {value.slice(0, 2).map((item) => (
                <Badge key={item} className={badgeColors?.[item]}>
                  {labels[item]}
                </Badge>
              ))}

              {value.length > 2 && (
                <Badge variant="secondary">+{value.length - 2}</Badge>
              )}
            </>
          )}
        </div>

        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-55 p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const checked = value.includes(option);

                return (
                  <CommandItem
                    key={option}
                    value={option}
                    data-checked={checked}
                    onSelect={() => {
                      toggleValue(option);
                    }}
                  >
                    {labels[option]}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
