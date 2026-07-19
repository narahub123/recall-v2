import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PromptGroupClient } from "@/components/admin/prompt-group/prompt-group-client";

export default function PromptGroupsPage() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Prompt Groups</h1>

          <p className="text-sm text-muted-foreground">
            LLM Prompt Group을 관리합니다.
          </p>
        </div>

        <Button>
          <Link href="/admin/prompts/new">Create</Link>
        </Button>
      </div>

      <PromptGroupClient />
    </main>
  );
}
