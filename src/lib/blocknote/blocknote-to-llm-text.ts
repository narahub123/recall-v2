import type { Block } from "@blocknote/core";

export function convertBlockNoteToLlmText(blocks: Block[]): string {
  return blocks
    .map((block) => convertBlockToText(block))
    .filter(Boolean)
    .join("\n\n");
}

function convertBlockToText(block: Block): string {
  const text = extractInlineText(block);

  const childrenText =
    block.children.length > 0 ? convertBlockNoteToLlmText(block.children) : "";

  const blockText = convertByBlockType(block, text);

  return [blockText, childrenText].filter(Boolean).join("\n\n");
}

function extractInlineText(block: Block): string {
  if (!Array.isArray(block.content)) {
    return "";
  }

  return block.content
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "text" in item &&
        typeof item.text === "string"
      ) {
        return item.text;
      }

      return "";
    })
    .join("");
}

function convertByBlockType(block: Block, text: string): string {
  switch (block.type) {
    case "heading":
      return convertHeading(block, text);

    case "bulletListItem":
      return text ? `- ${text}` : "";

    case "numberedListItem":
      return text ? `1. ${text}` : "";

    case "checkListItem":
      return text ? `- [ ] ${text}` : "";

    case "codeBlock":
      return convertCodeBlock(block, text);

    case "paragraph":
      return text;

    default:
      return text;
  }
}

function convertHeading(block: Block, text: string): string {
  const level =
    "props" in block &&
    typeof block.props === "object" &&
    block.props !== null &&
    "level" in block.props &&
    typeof block.props.level === "number"
      ? block.props.level
      : 1;

  return `${"#".repeat(level)} ${text}`;
}

function convertCodeBlock(block: Block, text: string): string {
  const language =
    "props" in block &&
    typeof block.props === "object" &&
    block.props !== null &&
    "language" in block.props &&
    typeof block.props.language === "string"
      ? block.props.language
      : "";

  return ["```" + language, text, "```"].join("\n");
}
