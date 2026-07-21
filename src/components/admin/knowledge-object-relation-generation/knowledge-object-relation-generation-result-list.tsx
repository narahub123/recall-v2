import type { KnowledgeObjectRelationGenerationViewDTO } from "@/dto/knowledge-object-relation-generation-view.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  results: KnowledgeObjectRelationGenerationViewDTO["results"];
}

export function KnowledgeObjectRelationGenerationResultList({
  results,
}: Props) {
  if (results.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        관계 판단 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Relation Results</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div
              key={`${result.source.id}-${result.target.id}-${index}`}
              className="rounded-md border p-4 space-y-3"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>

                  <p className="text-sm font-medium">{result.source.name}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Target</p>

                  <p className="text-sm font-medium">{result.target.name}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Related</p>

                  <p className="text-sm">{result.related ? "YES" : "NO"}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Relation Type</p>

                  <p className="text-sm">{result.relationType ?? "-"}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>

                  <p className="text-sm">
                    {result.confidence !== null &&
                    result.confidence !== undefined
                      ? result.confidence
                      : "-"}
                  </p>
                </div>
              </div>

              {result.reason && (
                <div>
                  <p className="text-xs text-muted-foreground">Reason</p>

                  <p className="text-sm whitespace-pre-wrap">{result.reason}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
