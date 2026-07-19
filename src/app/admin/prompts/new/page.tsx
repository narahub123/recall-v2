import { PromptGroupForm } from "@/components/admin/prompt-group/prompt-group-form";

export default function NewPromptGroupPage() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Prompt Group</h1>

        <p className="text-sm text-muted-foreground">
          새로운 Prompt Group을 생성합니다.
        </p>
      </div>

      <PromptGroupForm />
    </main>
  );
}
