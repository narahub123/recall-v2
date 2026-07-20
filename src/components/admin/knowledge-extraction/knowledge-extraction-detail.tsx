"use client";

import { useKnowledgeExtraction } from "@/hooks/knowledge-extraction/queries/use-knowledge-extraction";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminBreadcrumb } from "../admin-breadcrumb";
import { formatDate } from "@/lib/date/format-date";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
}

export function KnowledgeExtractionDetail({ id }: Props) {
  const { data: extraction, isLoading, isError } = useKnowledgeExtraction(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !extraction) {
    return <div>Knowledge Extraction을 찾을 수 없습니다.</div>;
  }

  const knowledgeObjects = extraction.result?.knowledge_objects ?? [];

  return (
    <Card>
      <div className="pl-4">
        <AdminBreadcrumb
          items={[
            {
              label: "관리자",
              href: "/admin",
            },
            {
              label: "Knowledge Extraction",
              href: "/admin/knowledge-extractions",
            },
            {
              label: "상세",
            },
          ]}
        />
      </div>

      <CardHeader>
        <CardTitle>Knowledge Extraction Detail</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-3">
          <DetailItem label="ID" value={extraction.id} />

          <DetailItem
            label="Note"
            value={extraction.note.title ?? "제목 없음"}
          />

          <DetailItem
            label="Prompt"
            value={`${extraction.promptGroup.name} v${extraction.promptVersion.version}`}
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

          <DetailItem
            label="Created At"
            value={formatDate(extraction.createdAt)}
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Usage</h2>

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
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Prompt Snapshot</h2>

          <Collapsible>
            <div className="rounded-lg border">
              <div className="flex items-center justify-between p-4">
                <CollapsibleTrigger className="flex-1 cursor-pointer">
                  프롬프트 내용을 확인하려면 여기를 클릭하세요.
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <pre className="border-t p-4 whitespace-pre-wrap break-all text-sm">
                  {extraction.promptSnapshot}
                </pre>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Knowledge Objects</h2>

          {knowledgeObjects.length === 0 ? (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              추출된 Knowledge Object가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {knowledgeObjects.map((object, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-2">
                  <DetailItem label="Name" value={object.name} />

                  <DetailItem label="Description" value={object.description} />

                  <DetailItem label="Reason" value={object.reason} />

                  <DetailItem label="Parent" value={object.parent ?? "-"} />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Raw Result</h2>

          <pre className="rounded-lg border p-4 whitespace-pre-wrap break-all text-sm">
            {JSON.stringify(extraction.result, null, 2)}
          </pre>
        </section>
      </CardContent>
    </Card>
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
