"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useAdminNotes } from "@/hooks/note/queries/use-admin-notes";

interface Props {
  value: string;

  onChange: (value: string) => void;

  label?: string | null;
}

export function AdminNoteSelect({ value, onChange, label = "Note" }: Props) {
  const { data: notes } = useAdminNotes();

  const selected =
    notes?.find((note) => note.id === value)?.title ?? "노트 선택";

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Select
        value={value}
        onValueChange={(next) => {
          onChange(next ?? "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue>{selected}</SelectValue>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {notes?.map((note) => (
            <SelectItem key={note.id} value={note.id}>
              {note.title || "제목 없음"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
