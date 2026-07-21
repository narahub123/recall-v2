export type AdminMenuItem = {
  label: string;
  href?: string;
  children?: AdminMenuItem[];
  icon?: React.ElementType;
};
