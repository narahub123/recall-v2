import { NoteRelationDTO } from "@/dto/note-relation.dto";

import { NoteRelationCard } from "./note-relation-card";

interface Props {
  noteRelations: NoteRelationDTO[];
}

export function NoteRelationList({ noteRelations }: Props) {
  if (noteRelations.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        등록된 Note Relation이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {noteRelations.map((relation) => (
        <NoteRelationCard key={relation.id} noteRelation={relation} />
      ))}
    </div>
  );
}
