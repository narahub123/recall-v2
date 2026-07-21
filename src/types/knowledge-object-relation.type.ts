export interface KnowledgeRelationResult {
  related: boolean;

  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  relationType?: string | null;

  reason?: string | null;

  confidence?: number | null;
}
