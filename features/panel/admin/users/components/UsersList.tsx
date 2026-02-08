"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAdminUsersQuery } from "../hooks/queries";
import {
  useDeleteAuthorMutation,
  useDeleteInstitutionMutation,
} from "../hooks/mutations";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import {
  FilterToolbar,
  Pagination,
  EllipsisTooltip,
} from "@/features/shared/components";
import type {
  AdminUser,
  AuthorProfileInfo,
  InstitutionProfileInfo,
} from "../types";
import { InstitutionEditDialog } from "./InstitutionEditDialog";
import { AuthorEditDialog } from "./AuthorEditDialog";

export function UsersList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("page_size")) || 10;
  const userTypeParam = searchParams.get("user_type") || "all";
  const searchParam = searchParams.get("search") || "";

  const [deleteTarget, setDeleteTarget] = React.useState<{
    id: number;
    type: "author" | "institution";
    name: string;
  } | null>(null);

  const { data, error, isPending } = useAdminUsersQuery({
    user_type:
      userTypeParam === "all"
        ? undefined
        : (userTypeParam as "author" | "institution" | "admin"),
    search: searchParam || undefined,
    page: currentPage,
    page_size: pageSize,
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
          <EllipsisTooltip
            text={row.profile_name}
            maxLength={30}
            spanProps={{ className: "font-medium" }}
          />
          <EllipsisTooltip
            text={row.email}
            maxLength={35}
            spanProps={{ className: "text-xs text-muted-foreground" }}
          />
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
          const info = row.profile_info as AuthorProfileInfo;
          return (
            <div className="flex flex-col gap-0.5 text-sm">
              <EllipsisTooltip text={info.designation || "—"} maxLength={25} />
              <EllipsisTooltip
                text={info.institute || "—"}
                maxLength={30}
                spanProps={{ className: "text-muted-foreground" }}
              />
            </div>
          );
        }
        if (row.user_type === "institution" && row.profile_info) {
          const info = row.profile_info as InstitutionProfileInfo;
          const location =
            info.city && info.country
              ? `${info.city}, ${info.country}`
              : info.city || info.country || "—";
          return (
            <div className="flex flex-col gap-0.5 text-sm">
              <EllipsisTooltip
                text={info.institution_type || "—"}
                maxLength={25}
              />
              <EllipsisTooltip
                text={location}
                maxLength={30}
                spanProps={{ className: "text-muted-foreground" }}
              />
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

  const totalPages = data ? Math.ceil(data.count / pageSize) : 1;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <FilterToolbar>
        <div className="flex items-center gap-4 w-full">
          <FilterToolbar.Search
            paramName="search"
            placeholder="Search by name or email..."
            className="flex-1"
          />
          <FilterToolbar.Select
            paramName="user_type"
            options={[
              { label: "All Users", value: "all" },
              { label: "Authors", value: "author" },
              { label: "Institutions", value: "institution" },
              { label: "Admins", value: "admin" },
            ]}
            placeholder="Filter by type"
            className="w-48"
          />
        </div>
      </FilterToolbar>

      <DataTable
        data={data?.results || []}
        columns={columns}
        isPending={isPending}
        error={error}
        errorMessage="Failed to load users"
        emptyMessage="No users found."
        hoverable
        pendingRows={10}
      />

      {data && data.count > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={data.count}
          pageSize={pageSize}
          showPageSizeSelector={true}
          showPageInfo={true}
          showFirstLast={true}
        />
      )}

      <ConfirmationPopup
        open={deleteTarget !== null}
        onOpenChange={(open) =>
          !open &&
          (setDeleteTarget(null),
          deleteInstitution.reset(),
          deleteAuthor.reset())
        }
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
