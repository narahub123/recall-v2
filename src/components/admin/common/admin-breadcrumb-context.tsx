"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

import { createAdminBreadcrumb } from "@/lib/admin/create-admin-breadcrumb";

import type { AdminBreadcrumbItem } from "@/types/admin-breadcrumb";

type AdminBreadcrumbContextValue = {
  items: AdminBreadcrumbItem[];
  setDynamicItems: (items: AdminBreadcrumbItem[]) => void;
  resetItems: () => void;
};

const AdminBreadcrumbContext =
  createContext<AdminBreadcrumbContextValue | null>(null);

type AdminBreadcrumbProviderProps = {
  children: ReactNode;
};

export function AdminBreadcrumbProvider({
  children,
}: AdminBreadcrumbProviderProps) {
  const pathname = usePathname();

  const [baseItems, setBaseItems] = useState<AdminBreadcrumbItem[]>([]);
  const [dynamicItems, setDynamicItemsState] = useState<AdminBreadcrumbItem[]>(
    [],
  );

  const items = [...baseItems, ...dynamicItems];

  useEffect(() => {
    setBaseItems(createAdminBreadcrumb(pathname));
    setDynamicItemsState([]);
  }, [pathname]);

  /**
   * 상세 페이지의 동적 breadcrumb를 추가한다.
   */
  const setDynamicItems = (items: AdminBreadcrumbItem[]) => {
    setDynamicItemsState(items);
  };

  /**
   * 동적 breadcrumb를 제거하고 기본 breadcrumb로 복구한다.
   */
  const resetItems = () => {
    setBaseItems(createAdminBreadcrumb(pathname));
    setDynamicItemsState([]);
  };

  return (
    <AdminBreadcrumbContext.Provider
      value={{
        items,
        setDynamicItems,
        resetItems,
      }}
    >
      {children}
    </AdminBreadcrumbContext.Provider>
  );
}

export function useAdminBreadcrumb() {
  const context = useContext(AdminBreadcrumbContext);

  if (!context) {
    throw new Error(
      "useAdminBreadcrumb must be used within AdminBreadcrumbProvider",
    );
  }

  return context;
}
