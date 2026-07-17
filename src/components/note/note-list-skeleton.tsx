import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export function NoteListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-3 p-4">
            <Skeleton className="h-5 w-1/3" />

            <Skeleton className="h-4 w-1/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
