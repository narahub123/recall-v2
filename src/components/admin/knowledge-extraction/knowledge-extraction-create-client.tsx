"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAdminNotes } from "@/hooks/note/queries/use-admin-notes";
import { usePromptGroups } from "@/hooks/prompt-group/queries/use-prompt-groups";
import { usePromptVersions } from "@/hooks/prompt-version/queries/use-prompt-versions";

import { useRunKnowledgeExtraction } from "@/hooks/knowledge-extraction/mutations/use-run-knowledge-extraction";
import { AdminBreadcrumb } from "../admin-breadcrumb";

const MODELS = [
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
  },
];

export function KnowledgeExtractionCreateClient() {
  const router = useRouter();

  const [noteId, setNoteId] = useState("");
  const [promptGroupId, setPromptGroupId] = useState("");
  const [promptVersionId, setPromptVersionId] = useState("");

  const [model, setModel] = useState("gpt-4o-mini");

  const [temperature, setTemperature] = useState("0");

  const { data: notes } = useAdminNotes();

  const { data: promptGroups } = usePromptGroups();

  const { data: promptVersions } = usePromptVersions(promptGroupId);

  const mutation = useRunKnowledgeExtraction();

  function handlePromptGroupChange(value: string) {
    setPromptGroupId(value);

    setPromptVersionId("");
  }

  function handleSubmit() {
    if (!noteId) {
      return;
    }

    if (!promptVersionId) {
      return;
    }

    mutation.mutate(
      {
        noteId,

        promptVersionId,

        model,

        temperature: Number(temperature),
      },
      {
        onSuccess(result) {
          sessionStorage.setItem(
            "knowledge-extraction-preview",
            JSON.stringify(result),
          );

          router.push("/admin/knowledge-extractions/preview");
        },
      },
    );
  }

  const selectedNoteTitle =
    notes?.find((note) => note.id === noteId)?.title ?? "노트 선택";

  const selectedPromptGroupName =
    promptGroups?.find((group) => group.id === promptGroupId)?.name ??
    "프롬프트 그룹 선택";

  const selectedPromptVersion = promptVersions?.find(
    (version) => version.id === promptVersionId,
  );

  const selectedModel =
    MODELS.find((item) => item.value === model)?.label ?? model;

  return (
    <Card>
      <div className="pl-4">
        <AdminBreadcrumb
          items={[
            {
              label: "관리자",
              href: "/admin",
            },
            {
              label: "Knowledge Extraction",
              href: "/admin/knowledge-extractions",
            },
            {
              label: "생성",
            },
          ]}
        />
      </div>
      <CardHeader>
        <CardTitle>Knowledge Extraction 실행</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Note</Label>

          <Select
            value={noteId}
            onValueChange={(value) => {
              setNoteId(value ?? "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{selectedNoteTitle}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {notes?.map((note) => (
                <SelectItem key={note.id} value={note.id}>
                  {note.title || "제목 없음"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Prompt Group</Label>

          <Select
            value={promptGroupId}
            onValueChange={(value) => {
              handlePromptGroupChange(value ?? "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{selectedPromptGroupName}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {promptGroups?.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Prompt Version</Label>

          <Select
            value={promptVersionId}
            onValueChange={(value) => {
              setPromptVersionId(value ?? "");
            }}
            disabled={!promptGroupId}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {selectedPromptVersion
                  ? `v${selectedPromptVersion.version}`
                  : "프롬프트 버전 선택"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {promptVersions?.map((version) => (
                <SelectItem key={version.id} value={version.id}>
                  v{version.version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Model</Label>

          <Select
            value={model}
            onValueChange={(value) => {
              setModel(value ?? "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{selectedModel}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {MODELS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Temperature</Label>

          <Input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(event) => {
              setTemperature(event.target.value);
            }}
          />
        </div>

        <Button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? "실행 중..." : "LLM 실행"}
        </Button>
      </CardContent>
    </Card>
  );
}
