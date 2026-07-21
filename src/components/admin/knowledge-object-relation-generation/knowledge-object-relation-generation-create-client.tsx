"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import { KnowledgeObjectRelationGenerationRunForm } from "./knowledge-object-relation-generation-run-form";

export function KnowledgeObjectRelationGenerationCreateClient() {
  const router = useRouter();

  return (
    <KnowledgeObjectRelationGenerationRunForm
      onSuccess={() => {
        router.push(ROUTES.ADMIN.KNOWLEDGE_OBJECT_RELATION_GENERATIONS);
      }}
    />
  );
}
