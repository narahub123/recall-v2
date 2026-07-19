import { PromptVersionDetail } from "@/components/admin/prompt-version/prompt-version-detail";

type PromptVersionDetailPageProps = {
  params: Promise<{
    id: string;
    versionId: string;
  }>;
};

export default async function PromptVersionDetailPage({
  params,
}: PromptVersionDetailPageProps) {
  const { id, versionId } = await params;

  return (
    <main className="p-6">
      <PromptVersionDetail promptGroupId={id} versionId={versionId} />
    </main>
  );
}
