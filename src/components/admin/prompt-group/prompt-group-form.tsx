"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreatePromptGroup } from "@/hooks/prompt-group/mutations/use-create-prompt-group";

type PromptGroupFormValues = {
  key: string;
  name: string;
  description: string;
};

export function PromptGroupForm() {
  const { register, handleSubmit, reset } = useForm<PromptGroupFormValues>({
    defaultValues: {
      key: "",
      name: "",
      description: "",
    },
  });

  const { mutate: createPromptGroup, isPending } = useCreatePromptGroup();

  function onSubmit(data: PromptGroupFormValues) {
    createPromptGroup(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <section className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-semibold">Create Prompt Group</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>

          <Input
            placeholder="knowledge-classification"
            {...register("key", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <Input
            placeholder="Knowledge Classification"
            {...register("name", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea
            placeholder="Prompt Group description"
            {...register("description")}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </section>
  );
}
