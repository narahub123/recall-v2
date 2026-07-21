"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_STORAGE_KEY = "admin-sidebar-collapsed";

type AdminSidebarContextValue = {
  sidebarCollapsed: boolean;
  initialized: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(
  null,
);

type AdminSidebarProviderProps = {
  children: ReactNode;
};

export function AdminSidebarProvider({ children }: AdminSidebarProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }

    setInitialized(true);
  }, []);

  const setCollapsedState = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);

    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const nextState = !prev;

      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(nextState));

      return nextState;
    });
  };

  const expandSidebar = () => {
    setCollapsedState(false);
  };

  return (
    <AdminSidebarContext.Provider
      value={{
        sidebarCollapsed,
        initialized,
        toggleSidebar,
        expandSidebar,
      }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);

  if (!context) {
    throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  }

  return context;
}
