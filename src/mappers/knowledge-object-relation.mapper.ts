import { KnowledgeObjectRelationDTO } from "@/dto/knowledge-object-relation.dto";

export class KnowledgeObjectRelationMapper {
  static toDTO(relation: {
    _id: unknown;

    sourceKnowledgeObjectId: string;

    targetKnowledgeObjectId: string;

    relationType: string;

    reason: string;

    confidence: number;

    createdAt: Date;

    updatedAt: Date;
  }): KnowledgeObjectRelationDTO {
    return {
      id: String(relation._id),

      sourceKnowledgeObjectId: relation.sourceKnowledgeObjectId,

      targetKnowledgeObjectId: relation.targetKnowledgeObjectId,

      relationType: relation.relationType,

      reason: relation.reason,

      confidence: relation.confidence,

      createdAt: relation.createdAt.toISOString(),

      updatedAt: relation.updatedAt.toISOString(),
    };
  }
}
