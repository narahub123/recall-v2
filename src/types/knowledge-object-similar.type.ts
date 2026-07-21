export interface KnowledgeObjectSimilar {
  _id: string;

  noteId: string;

  name: string;

  description: string;

  reason: string;

  parent?: string | null;

  score: number;
}
