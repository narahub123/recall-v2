import Link from "next/link";

import { PromptVersionDTO } from "@/dto/prompt-version.dto";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

type PromptVersionCardProps = {
  version: PromptVersionDTO;
};

export function PromptVersionCard({ version }: PromptVersionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Version {version.version}</CardTitle>

          <Badge>v{version.version}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
          {version.content}
        </p>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm">
          <Link
            href={`${ROUTES.ADMIN.PROMPTS}/${version.promptGroupId}/versions/${version.id}`}
          >
            상세 보기
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
