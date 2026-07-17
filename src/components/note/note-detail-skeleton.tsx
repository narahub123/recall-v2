import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export function NoteDetailSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Skeleton className="h-8 w-1/3" />

        <Skeleton className="h-4 w-1/5" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-125 w-full" />
      </CardContent>
    </Card>
  );
}
