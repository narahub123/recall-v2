"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  value: number;

  onChange: (value: number) => void;

  label?: string;

  showLabel?: boolean;
}

export function TemperatureInput({
  value,
  onChange,
  label = "Temperature",
  showLabel = true,
}: Props) {
  return (
    <div className="space-y-2">
      {showLabel && <Label>{label}</Label>}

      <Input
        type="number"
        min="0"
        max="2"
        step="0.1"
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
      />
    </div>
  );
}
