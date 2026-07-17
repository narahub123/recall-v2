"use client";

import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { Block } from "@blocknote/core";

interface NoteEditorProps {
  initialContent?: Block[];
}

export function NoteEditor({ initialContent }: NoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  return <BlockNoteViewRaw editor={editor} />;
}
