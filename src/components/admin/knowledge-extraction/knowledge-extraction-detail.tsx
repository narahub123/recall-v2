"use client";

import { useKnowledgeExtraction } from "@/hooks/knowledge-extraction/queries/use-knowledge-extraction";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminBreadcrumb } from "../common/admin-breadcrumb";
import { formatDate } from "@/lib/date/format-date";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { KnowledgeExtractionResult } from "./knowledge-extraction-result";
import { KnowledgeObjectGenerator } from "./knowledge-object-generator";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

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

  const knowledgeExtractions = extraction.result?.knowledge_objects ?? [];

  return (
    <Card>
      <div className="pl-4">
        <AdminBreadcrumb
          items={[
            {
              label: "관리자",
              href: ROUTES.ADMIN.DASHBOARD,
            },
            {
              label: "Knowledge Extraction",
              href: ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS,
            },
            {
              label: extraction.note.title ?? "상세",
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

          <Link
            href={`${ROUTES.NOTES}/${extraction.note.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <DetailItem
              label="Note"
              value={extraction.note.title ?? "제목 없음"}
            />
          </Link>

          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${extraction.promptGroup.id}/versions/${extraction.promptVersion.id}`}
            className="block rounded-md py-1 text-sm transition-colors hover:bg-muted hover:text-primary"
          >
            <DetailItem
              label="Prompt"
              value={`${extraction.promptGroup.name} v${extraction.promptVersion.version}`}
            />
          </Link>

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

        <KnowledgeExtractionResult knowledgeObjects={knowledgeExtractions} />

        <section className="space-y-3">
          <h2 className="font-semibold">Raw Result</h2>

          <pre className="rounded-lg border p-4 whitespace-pre-wrap break-all text-sm">
            {JSON.stringify(extraction.result, null, 2)}
          </pre>
        </section>

        <KnowledgeObjectGenerator extractionId={extraction.id} />
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
