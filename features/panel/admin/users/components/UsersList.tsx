"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2,  Search } from "lucide-react";
import { useAdminUsersQuery } from "../hooks/queries";
import { useDeleteAuthorMutation, useDeleteInstitutionMutation } from "../hooks/mutations";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import DataTable, { type DataTableColumn } from "@/features/shared/components/DataTable";
import type { AdminUser } from "../types";
import { InstitutionEditDialog } from "./InstitutionEditDialog";
import { AuthorEditDialog } from "./AuthorEditDialog";

export function UsersList() {
  const [userType, setUserType] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<{
    id: number;
    type: "author" | "institution";
    name: string;
  } | null>(null);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: users, error, isPending } = useAdminUsersQuery({
    user_type: userType === "all" ? undefined : (userType as any),
    search: debouncedSearch || undefined,
  });

  const deleteAuthor = useDeleteAuthorMutation(deleteTarget?.id, {
    onSuccess: () => setDeleteTarget(null),
  });

  const deleteInstitution = useDeleteInstitutionMutation(deleteTarget?.id, {
    onSuccess: () => setDeleteTarget(null),
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "author") {
      deleteAuthor.mutate();
    } else {
      deleteInstitution.mutate();
    }
  };

  const columns: DataTableColumn<AdminUser>[] = [
    {
      key: "profile_name",
      header: "Name",
      cellClassName: "font-medium",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">{row.profile_name}</span>
          <span className="text-xs text-muted-foreground">{row.email}</span>
        </div>
      ),
    },
    {
      key: "user_type",
      header: "Type",
      render: (row) => (
        <Badge variant="secondary">
          {row.user_type === "author"
            ? "Author"
            : row.user_type === "institution"
              ? "Institution"
              : "Admin"}
        </Badge>
      ),
    },
    {
      key: "profile_info",
      header: "Details",
      render: (row) => {
        if (row.user_type === "author" && row.profile_info) {
          const info = row.profile_info as any;
          return (
            <div className="flex flex-col gap-0.5 text-sm">
              <span>{info.designation}</span>
              <span className="text-muted-foreground">{info.institute}</span>
            </div>
          );
        }
        if (row.user_type === "institution" && row.profile_info) {
          const info = row.profile_info as any;
          return (
            <div className="flex flex-col gap-0.5 text-sm">
              <span>{info.institution_type}</span>
              <span className="text-muted-foreground">
                {info.city && info.country ? `${info.city}, ${info.country}` : info.city || info.country || "—"}
              </span>
            </div>
          );
        }
        return <span className="text-muted-foreground">—</span>;
      },
    },
    {
      key: "publications_count",
      header: "Publications",
      render: (row) => (
        <span className="font-medium">{row.publications_count || 0}</span>
      ),
    },
    {
      key: "is_active",
      header: "Status",
      render: (row) => (
        <Badge variant={row.is_active ? "default" : "destructive"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Joined",
      render: (row) =>
        new Date(row.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => {
        // Don't allow editing or deleting admin users
        if (row.user_type === "admin") {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <div className="flex items-center gap-2 justify-end">
            {row.user_type === "author" ? (
              <AuthorEditDialog authorId={row.id} />
            ) : (
              <InstitutionEditDialog institutionId={row.id} />
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setDeleteTarget({
                  id: row.id,
                  type: row.user_type as "author" | "institution",
                  name: row.profile_name,
                })
              }
              title="Delete user"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Manage all users in the system
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="author">Authors</SelectItem>
            <SelectItem value="institution">Institutions</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={users || []}
        columns={columns}
        isPending={isPending}
        error={error}
        errorMessage="Failed to load users"
        emptyMessage="No users found."
        hoverable
        pendingRows={10}
      />

      <ConfirmationPopup
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Delete ${deleteTarget?.type === "author" ? "Author" : "Institution"}`}
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone and will delete all associated data.`}
        confirmText="Delete"
        cancelText="Cancel"
        isPending={deleteAuthor.isPending || deleteInstitution.isPending}
      />
    </div>
  );
}
