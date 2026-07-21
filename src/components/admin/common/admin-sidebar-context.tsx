"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_STORAGE_KEY = "admin-sidebar-open";

type AdminSidebarContextValue = {
  sidebarOpen: boolean;
  initialized: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(
  null,
);

type AdminSidebarProviderProps = {
  children: ReactNode;
};

export function AdminSidebarProvider({ children }: AdminSidebarProviderProps) {
  const [sidebarOpen, setSidebarOpenState] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (savedState !== null) {
      setSidebarOpenState(savedState === "true");
    }

    setInitialized(true);
  }, []);

  const setSidebarOpen = (open: boolean) => {
    setSidebarOpenState(open);

    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AdminSidebarContext.Provider
      value={{
        sidebarOpen,
        initialized,
        toggleSidebar,
        setSidebarOpen,
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
