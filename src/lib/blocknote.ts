import type { Block } from "@blocknote/core";

export function extractBlockText(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (!Array.isArray(block.content)) {
        return "";
      }

      return block.content
        .map((item) => {
          if (typeof item === "object" && "text" in item) {
            return item.text;
          }

          return "";
        })
        .join("");
    })
    .join(" ");
}

export function createEmptyNoteContent(): Block[] {
  return [
    {
      id: crypto.randomUUID(),
      type: "paragraph",
      props: {
        backgroundColor: "default",
        textColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ];
}
