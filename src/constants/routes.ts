export const ROUTES = {
  HOME: "/",
  ADMIN: {
    DASHBOARD: "/admin",
    NOTE_RELATIONS: "/admin/note-relations",

    PROMPTS: "/admin/prompts",
    PROMPTS_NEW: "/admin/prompts/new",

    KNOWLEDGE_EXTRACTIONS: "/admin/knowledge-extractions",
    KNOWLEDGE_EXTRACTIONS_PREVIEW: "/admin/knowledge-extractions/preview",
    KNOWLEDGE_EXTRACTIONS_NEW: "/admin/knowledge-extractions/new",
    KNOWLEDGE_OBJECTS: "/admin/knowledge-objects",
    KNOWLEDGE_OBJECTS_NEW: "/admin/knowledge-objects/new",
    KNOWLEDGE_OBJECT_GENERATIONS: "/admin/knowledge-object-generations",
    KNOWLEDGE_OBJECT_RELATIONS: "/admin/knowledge-object-relations",
    KNOWLEDGE_OBJECT_RELATION_GENERATIONS:
      "/admin/knowledge-object-relation-generations",
    KNOWLEDGE_OBJECT_RELATION_GENERATIONS_NEW: "/admin/knowledge-object-relation-generations/new",
  },
  NOTES: "/notes",
  LOGIN: "/login",
} as const;
