export interface KnowledgeRelationLlmResult {
  related: boolean;

  sourceName?: string;

  targetName?: string;

  relationType?: string;

  reason?: string;

  confidence?: number;
}
