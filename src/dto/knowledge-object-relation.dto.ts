export interface KnowledgeObjectRelationDTO {
  id: string;

  sourceKnowledgeObjectId: string;

  targetKnowledgeObjectId: string;

  relationType: string;

  reason: string;

  confidence: number;

  createdAt: string;

  updatedAt: string;
}
