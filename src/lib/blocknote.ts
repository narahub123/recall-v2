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
