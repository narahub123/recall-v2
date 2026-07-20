import { Card, CardContent } from "@/components/ui/card";

interface KnowledgeExtractionObject {
  name: string;
  description: string;
  reason: string;
  parent?: string | null;
}

interface Props {
  knowledgeObjects: KnowledgeExtractionObject[];
}

export function KnowledgeExtractionResult({ knowledgeObjects }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Extraction Result</h2>

      {knowledgeObjects.length === 0 ? (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          추출된 Knowledge Object가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {knowledgeObjects.map((object, index) => (
            <Card key={index}>
              <CardContent className="space-y-2 pt-4">
                <DetailItem label="Name" value={object.name} />

                <DetailItem label="Description" value={object.description} />

                <DetailItem label="Reason" value={object.reason} />

                <DetailItem label="Parent" value={object.parent ?? "-"} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 text-sm">
      <span className="w-30 shrink-0 font-medium">{label}</span>

      <span className="break-all">{value}</span>
    </div>
  );
}
