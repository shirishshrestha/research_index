"use client";

import { PanelContainer } from "@/features/shared";
import { UsersList } from "@/features/panel/admin/users";

export default function AdminUsersPage() {
  return (
    <PanelContainer>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2 text-primary!">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all users in the system - authors, institutions, and administrators
          </p>
        </div>
        <UsersList />
      </div>
    </PanelContainer>
  );
}
