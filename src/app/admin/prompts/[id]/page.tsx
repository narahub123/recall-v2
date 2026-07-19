import { notFound } from "next/navigation";

import { PromptGroupDetail } from "@/components/admin/prompt-group/prompt-group-detail";

type PromptGroupDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PromptGroupDetailPage({
  params,
}: PromptGroupDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <main className="p-6">
      <PromptGroupDetail id={id} />
    </main>
  );
}
