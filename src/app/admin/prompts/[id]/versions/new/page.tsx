import { PromptVersionForm } from "@/components/admin/prompt-version/prompt-version-form";

type PromptVersionNewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PromptVersionNewPage({
  params,
}: PromptVersionNewPageProps) {
  const { id } = await params;

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Prompt Version</h1>

        <p className="text-sm text-muted-foreground">
          새로운 Prompt Version을 생성합니다.
        </p>
      </div>

      <PromptVersionForm promptGroupId={id} />
    </main>
  );
}
