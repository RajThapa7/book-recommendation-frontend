import AdminLayout from "@/components/pages/admin/layout/admin.layout";
import React from "react";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AdminLayout>
        <main className="h-full">{children}</main>
      </AdminLayout>
  );
}
