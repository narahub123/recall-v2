import { AdminBreadcrumbProvider } from "@/components/admin/common/admin-breadcrumb-context";
import { AdminContainer } from "@/components/admin/common/admin-container";
import { AdminHeader } from "@/components/admin/common/admin-header";
import { AdminSidebar } from "@/components/admin/common/admin-sidebar";
import { AdminSidebarProvider } from "@/components/admin/common/admin-sidebar-context";

import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <AdminSidebarProvider>
      <AdminBreadcrumbProvider>
        <AdminContainer>
          <AdminSidebar />

          <div className="flex-1">
            <AdminHeader />

            <main>{children}</main>
          </div>
        </AdminContainer>
      </AdminBreadcrumbProvider>
    </AdminSidebarProvider>
  );
}
