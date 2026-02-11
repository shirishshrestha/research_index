"use client";

import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import type { IssueListItem } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterToolbar } from "@/features/shared/components/search/FilterToolbar";
import { useIssuesQuery, useDeleteIssueMutation } from "../hooks";
import { ISSUE_STATUS_VARIANTS } from "../constants";
import { format } from "date-fns";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import Link from "next/link";
import { Pagination } from "@/features/shared/components/lists/Pagination";

interface IssuesListProps {
  journalId: number | string;
}

export function IssuesList({ journalId }: IssuesListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: response,
    isPending: isLoading,
    isError,
  } = useIssuesQuery(journalId);

  // Extract pagination data
  const issues = response?.results || [];
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const columns: DataTableColumn<IssueListItem>[] = [
    {
      key: "cover",
      header: "",
      render: (row) => (
        <div className="w-12 h-16 rounded overflow-hidden bg-muted shrink-0">
          {row.cover_image_url ? (
            <img
              src={row.cover_image_url}
              alt={`Volume ${row.volume} Issue ${row.issue_number}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-bold">
              V{row.volume}
            </div>
          )}
        </div>
      ),
      cellClassName: "w-16",
    },
    {
      key: "issue",
      header: "Issue",
      render: (row) => (
        <div className="space-y-1">
          <p className="font-medium">
            Vol. {row.volume}, Issue {row.issue_number}
          </p>
          {row.title && (
            <p className="text-sm text-muted-foreground">{row.title}</p>
          )}
        </div>
      ),
      cellClassName: "min-w-[200px]",
    },
    {
      key: "publication_date",
      header: "Publication Date",
      render: (row) => (
        <div className="text-sm">
          {format(new Date(row.publication_date), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (row) => (
        <div className="flex flex-col gap-1 items-center">
          <Badge
            variant={
              ISSUE_STATUS_VARIANTS[
                row.status as keyof typeof ISSUE_STATUS_VARIANTS
              ]
            }
          >
            {row.status_display}
          </Badge>
          {row.is_special_issue && (
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              Special
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "articles_count",
      header: "Articles",
      align: "center",
      render: (row) => (
        <div className="text-sm font-medium">{row.articles_count}</div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (row) =>
        row.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {row.description}
          </p>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
      cellClassName: "max-w-xs",
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <IssueActions
            issue={row}
            journalId={journalId}
            onView={`/institution/journals/${journalId}/issues/${row.id}`}
            onEdit={`/institution/journals/${journalId}/issues/${row.id}/edit`}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Journal Issues</h2>
          <p className="text-text-gray mt-1">
            Manage volumes and issues for this journal
          </p>
        </div>
        <Button
          onClick={() =>
            router.push(`/institution/journals/${journalId}/issues/create`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Issue
        </Button>
      </div>

      {/* Search and Filters */}
      <FilterToolbar>
        <FilterToolbar.Search
          paramName="search"
          placeholder="Search issues..."
        />
      </FilterToolbar>

      {/* Issues Table */}
      <DataTable
        data={issues}
        columns={columns}
        isPending={isLoading}
        error={isError ? "Failed to load issues" : null}
        errorMessage="Failed to load issues"
        emptyMessage="No issues yet. Create your first issue to get started."
        hoverable
        onRowClick={(row) =>
          router.push(`/institution/journals/${journalId}/issues/${row.id}`)
        }
        tableClassName="flex justify-center items-center"
      />

      {/* Pagination */}
      {totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          showPageSizeSelector={false}
        />
      )}
    </div>
  );
}

/**
 * Issue action buttons component
 */
interface IssueActionsProps {
  issue: IssueListItem;
  journalId: number | string;
  onView: string;
  onEdit: string;
}

function IssueActions({ issue, journalId, onView, onEdit }: IssueActionsProps) {
  const deleteMutation = useDeleteIssueMutation(journalId, issue.id);

  return (
    <div className="flex items-center gap-1 justify-end">
      <Link href={onView}>
        <Button size="sm" variant="ghost" type="button">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={onEdit}>
        <Button size="sm" variant="ghost" type="button">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <ConfirmationPopup
        title="Delete Issue?"
        description={`Are you sure you want to delete Volume ${issue.volume}, Issue ${issue.issue_number}${
          issue.title ? `: "${issue.title}"` : ""
        }? This action cannot be undone.`}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
        isSuccess={deleteMutation.isSuccess}
        onOpenChange={(open) => !open && deleteMutation.reset()}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        triggerButton={
          <Button size="sm" variant="ghost" type="button">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        }
      />
    </div>
  );
}
