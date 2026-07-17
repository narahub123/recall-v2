"use client";

import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react";

import type { Block } from "@blocknote/core";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { useEffect } from "react";

interface NoteEditorProps {
  initialContent: Block[];

  onChange?: (content: Block[]) => void;
}

export function NoteEditor({ initialContent, onChange }: NoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      onChange?.(editor.document);
    });

    return unsubscribe;
  }, [editor, onChange]);

  return <BlockNoteViewRaw editor={editor} />;
}
