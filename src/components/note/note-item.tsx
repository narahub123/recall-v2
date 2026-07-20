import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import type { NoteDTO } from "@/dto/note.dto";
import { extractBlockText } from "@/lib/blocknote/blocknote";

interface NoteItemProps {
  note: NoteDTO;
}

export function NoteItem({ note }: NoteItemProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="font-semibold">{note.title}</h2>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {extractBlockText(note.content) || "내용 없음"}
          </p>

          <p className="text-xs text-muted-foreground">
            작성: {new Date(note.createdAt).toLocaleDateString()}
            {" · "}
            수정: {new Date(note.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
