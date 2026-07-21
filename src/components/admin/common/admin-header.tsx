import { AdminSidebarTrigger } from "./admin-sidebar-trigger";

export function AdminHeader() {
  return (
    <header className="h-14 border-b flex items-center px-4 gap-2">
      <AdminSidebarTrigger />

      <span>Admin</span>
    </header>
  );
}
