"use client";

import { PanelContainer } from "@/features/shared";
import { AdminTopicsTable } from "@/features/panel/admin/topics/components/AdminTopicsTable";

export default function AdminTopicsPage() {
  return (
    <PanelContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Topics Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage research topics and their hierarchical branches
          </p>
        </div>
        <AdminTopicsTable />
      </div>
    </PanelContainer>
  );
}
