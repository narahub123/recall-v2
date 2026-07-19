"use client";

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
        router.push("/admin/knowledge-extraction");
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
