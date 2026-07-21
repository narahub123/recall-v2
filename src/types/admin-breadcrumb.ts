export type AdminBreadcrumbItem = {
  label: string;
  href?: string;
};

export type AdminBreadcrumbContext = {
  dynamicLabels?: Record<string, string>;
};
