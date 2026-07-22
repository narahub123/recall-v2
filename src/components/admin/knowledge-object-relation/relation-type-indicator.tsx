import { Badge } from "@/components/ui/badge";

import type { KnowledgeRelationType } from "@/constants/knowledge-object-relation";

interface Props {
  type: KnowledgeRelationType;
}

const RELATION_DIRECTION_MAP = {
  comparison: {
    left: "←",
    right: "→",
  },

  extension: {
    left: "→",
    right: "→",
  },

  alternative: {
    left: "↔",
    right: "↔",
  },

  criterion: {
    left: "→",
    right: "→",
  },
} satisfies Record<
  KnowledgeRelationType,
  {
    left: string;
    right: string;
  }
>;

const RELATION_BADGE_CLASS = {
  comparison: "bg-red-50 text-red-500 border-red-200 hover:bg-red-50",

  extension:
    "bg-emerald-50 text-emerald-500 border-emerald-200 hover:bg-emerald-50",

  alternative:
    "bg-violet-50 text-violet-500 border-violet-200 hover:bg-violet-50",

  criterion: "bg-amber-50 text-amber-500 border-amber-200 hover:bg-amber-50",
} satisfies Record<KnowledgeRelationType, string>;

export function RelationTypeIndicator({ type }: Props) {
  const direction = RELATION_DIRECTION_MAP[type];

  return (
    <div className="flex w-36 shrink-0 items-center justify-center gap-2">
      <span className="text-muted-foreground">{direction.left}</span>

      <Badge className={`font-semibold ${RELATION_BADGE_CLASS[type]}`}>
        {type}
      </Badge>

      <span className="text-muted-foreground">{direction.right}</span>
    </div>
  );
}
