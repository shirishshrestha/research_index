"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink, Eye } from "lucide-react";
import { PublicationFormDialog } from "./PublicationFormDialog";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import { usePublicationsQuery } from "../hooks/queries";
import { useDeletePublicationMutation } from "../hooks/mutations";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import type { Publication } from "../types";
import { EllipsisTooltip } from "@/features/shared";
import { Pagination } from "@/features/shared/components/lists/Pagination";
import { useSearchParams } from "next/navigation";
import type { PaginatedResponse } from "@/types/pagination";

interface PublicationsListProps {
  initialPublications?: PaginatedResponse<Publication>;
}

export function PublicationsList({
  initialPublications,
}: PublicationsListProps) {
  const searchParams = useSearchParams();
  // Use server-provided data as initial data, only fetch client-side if not provided
  const {
    data: response,
    error,
    isPending,
  } = usePublicationsQuery(initialPublications);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  // Extract pagination data
  const publications = response?.results || [];
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");
  const totalCount = response?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const deleteMutation = useDeletePublicationMutation(deleteId || undefined, {
    onSuccess: () => {
      setDeleteId(null);
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate();
    }
  };

  const columns: DataTableColumn<Publication>[] = [
    {
      key: "title",
      header: "Title",
      cellClassName: "font-medium",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            <EllipsisTooltip text={row.title} />
          </span>
          {row.doi && (
            <span className="text-xs text-muted-foreground">
              DOI: {row.doi}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "journal",
      header: "Journal",
      render: (row) =>
        row.journal_title || row.journal_name ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">
              <EllipsisTooltip
                text={row.journal_title || row.journal_name || ""}
              />
            </span>
            {row.journal_issn && (
              <span className="text-xs text-muted-foreground">
                ISSN: {row.journal_issn}
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "volume_issue",
      header: "Vol/Issue",
      render: (row) => {
        const parts = [];
        if (row.issue_volume || row.volume) {
          parts.push(`Vol. ${row.issue_volume || row.volume}`);
        }
        if (row.issue_number) {
          parts.push(`Issue ${row.issue_number}`);
        }
        return parts.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            {parts.map((part, i) => (
              <span key={i} className="text-sm">
                {part}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
    {
      key: "publication_type",
      header: "Type",
      render: (row) => (
        <Badge
          variant="secondary"
          className="whitespace-nowrap text-text-black! leading-tight"
        >
          {row.publication_type_display}
        </Badge>
      ),
    },
    {
      key: "published_date",
      header: "Published",
      render: (row) =>
        row.published_date
          ? new Date(row.published_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—",
    },
    {
      key: "stats",
      header: "Citations",
      render: (row) => (
        <span className="font-medium">{row.stats?.citations_count || 0}</span>
      ),
    },
    {
      key: "is_published",
      header: "Status",
      render: (row) => (
        <Badge variant={row.is_published ? "default" : "outline"}>
          {row.is_published ? (
            <span className="flex items-center leading-tight">
              <Eye className="w-3 h-3 mr-1" />
              Published
            </span>
          ) : (
            "Draft"
          )}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(`/articles/${row.id}`, "_blank")}
            title="View article details"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>

          <PublicationFormDialog publication={row} />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDeleteId(row.id)}
            title="Delete publication"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Publications</h2>
          <p className="text-muted-foreground">
            Manage your research publications
          </p>
        </div>
        <PublicationFormDialog />
      </div>

      <DataTable
        data={publications}
        columns={columns}
        isPending={isPending}
        error={error}
        errorMessage="Failed to load publications"
        emptyMessage="No publications found. Create your first publication to get started."
        hoverable
        pendingRows={5}
        tableClassName="bg-card flex items-center justify-center"
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

      <div onClick={(e) => e.stopPropagation()}>
        <ConfirmationPopup
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={handleDelete}
          title="Delete Publication"
          description="Are you sure you want to delete this publication? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          isPending={deleteMutation.isPending}
        />
      </div>
    </div>
  );
}
