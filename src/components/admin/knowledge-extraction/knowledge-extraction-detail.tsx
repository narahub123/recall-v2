import { KnowledgeExtractionDetailDTO } from "@/dto/knowledge-extraction-detail.dto";

interface Props {
  extraction: KnowledgeExtractionDetailDTO;
}

export function KnowledgeExtractionDetail({ extraction }: Props) {
  const knowledgeObjects = extraction.result?.knowledge_objects ?? [];

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Knowledge Extraction Detail</h1>

        <div className="rounded-lg border p-4 space-y-2">
          <DetailItem label="ID" value={extraction.id} />

          <DetailItem label="Note ID" value={extraction.noteId} />

          <DetailItem
            label="Prompt Version ID"
            value={extraction.promptVersionId}
          />

          <DetailItem label="Model" value={extraction.model} />

          <DetailItem
            label="Temperature"
            value={String(extraction.temperature)}
          />

          <DetailItem
            label="Response Format"
            value={extraction.responseFormat}
          />

          <DetailItem label="Created At" value={extraction.createdAt} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>

        <div className="rounded-lg border p-4 space-y-2">
          <DetailItem
            label="Input Tokens"
            value={String(extraction.usage.inputTokens)}
          />

          <DetailItem
            label="Output Tokens"
            value={String(extraction.usage.outputTokens)}
          />

          <DetailItem
            label="Total Tokens"
            value={String(extraction.usage.totalTokens)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Prompt Snapshot</h2>

        <pre className="rounded-lg border p-4 whitespace-pre-wrap text-sm">
          {extraction.promptSnapshot}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Knowledge Objects</h2>

        {knowledgeObjects.length === 0 ? (
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            추출된 Knowledge Object가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {knowledgeObjects.map((object, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <DetailItem label="Name" value={object.name} />

                <DetailItem label="Description" value={object.description} />

                <DetailItem label="Reason" value={object.reason} />

                <DetailItem label="Parent" value={object.parent ?? "-"} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Raw Result</h2>

        <pre className="rounded-lg border p-4 overflow-auto text-sm">
          {JSON.stringify(extraction.result, null, 2)}
        </pre>
      </section>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 text-sm">
      <span className="w-40 font-medium">{label}</span>

      <span className="break-all">{value}</span>
    </div>
  );
}
