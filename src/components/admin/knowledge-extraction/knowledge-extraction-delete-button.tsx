"use client";

import { ROUTES } from "@/constants/routes";
import { useDeleteKnowledgeExtraction } from "@/hooks/knowledge-extraction/mutations/use-delete-knowledge-extraction";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export function KnowledgeExtractionDeleteButton({ id }: Props) {
  const router = useRouter();

  const mutation = useDeleteKnowledgeExtraction();

  function handleDelete() {
    mutation.mutate(id, {
      onSuccess: () => {
        router.push(ROUTES.ADMIN.KNOWLEDGE_EXTRACTIONS);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="rounded border border-destructive px-4 py-2 text-destructive"
    >
      {mutation.isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
