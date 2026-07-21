import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { NoteRelationMapper } from "@/mappers/note-relation.mapper";

import { NoteRelationRepository } from "@/repositories/note-relation.repository";

export class NoteRelationService {
  constructor(
    private readonly noteRelationRepository: NoteRelationRepository,
  ) {}

  async createRelation(data: {
    sourceNoteId: string;

    targetNoteId: string;

    relationType: string;

    reason: string;

    confidence: number;
  }): Promise<NoteRelationDTO> {
    if (data.sourceNoteId === data.targetNoteId) {
      throw new Error("Note는 자기 자신과 Relation을 생성할 수 없습니다.");
    }

    const exists = await this.noteRelationRepository.findByRelation(
      data.sourceNoteId,

      data.targetNoteId,

      data.relationType,
    );

    if (exists) {
      throw new Error("이미 존재하는 Note Relation입니다.");
    }

    const relation = await this.noteRelationRepository.create(data);

    return NoteRelationMapper.toDTO(relation);
  }

  async getRelation(id: string): Promise<NoteRelationDTO | null> {
    const relation = await this.noteRelationRepository.findById(id);

    if (!relation) {
      return null;
    }

    return NoteRelationMapper.toDTO(relation);
  }

  async getRelations(): Promise<NoteRelationDTO[]> {
    const relations = await this.noteRelationRepository.findAll();

    return relations.map((relation) => NoteRelationMapper.toDTO(relation));
  }

  async getRelationsByNoteId(noteId: string): Promise<NoteRelationDTO[]> {
    const relations = await this.noteRelationRepository.findByNoteId(noteId);

    return relations.map((relation) => NoteRelationMapper.toDTO(relation));
  }

  async updateRelation(
    id: string,

    data: {
      relationType?: string;

      reason?: string;

      confidence?: number;
    },
  ): Promise<NoteRelationDTO | null> {
    const relation = await this.noteRelationRepository.update(
      id,

      data,
    );

    if (!relation) {
      return null;
    }

    return NoteRelationMapper.toDTO(relation);
  }

  async deleteRelation(id: string) {
    return this.noteRelationRepository.delete(id);
  }

  async deleteByNoteId(noteId: string) {
    return this.noteRelationRepository.deleteByNoteId(noteId);
  }
}

export const noteRelationService = new NoteRelationService(
  new NoteRelationRepository(),
);