"use client";

import { Plus, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import type { JournalListItem } from "../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FilterToolbar } from "@/features/shared/components/search/FilterToolbar";
import { useJournalsQuery } from "../hooks";

export function JournalsList() {
  const router = useRouter();

  const { data: journals, isPending: isLoading, isError } = useJournalsQuery();

  const columns: DataTableColumn<JournalListItem>[] = [
    {
      key: "cover",
      header: "",
      render: (row) => (
        <div className="w-12 h-12 rounded overflow-hidden bg-muted shrink-0">
          {row.cover_image_url ? (
            <img
              src={row.cover_image_url}
              alt={row.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-bold">
              {row.title.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      ),
      cellClassName: "w-16",
    },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <div className="space-y-1">
          <p className="font-medium">{row.title}</p>
          {row.short_title && (
            <p className="text-xs text-muted-foreground">{row.short_title}</p>
          )}
        </div>
      ),
      cellClassName: "min-w-[250px]",
    },
    {
      key: "issn",
      header: "ISSN",
      render: (row) => (
        <div className="text-sm space-y-0.5">
          {row.issn && <div>ISSN: {row.issn}</div>}
          {row.e_issn && (
            <div className="text-muted-foreground">E-ISSN: {row.e_issn}</div>
          )}
          {!row.issn && !row.e_issn && (
            <span className="text-muted-foreground">N/A</span>
          )}
        </div>
      ),
    },
    {
      key: "publisher",
      header: "Publisher",
      accessor: (row) => row.publisher_name || "N/A",
      cellClassName: "max-w-xs truncate",
    },
    {
      key: "frequency",
      header: "Frequency",
      accessor: (row) => row.frequency_display,
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (row) => (
        <div className="flex flex-col gap-1 items-center">
          <Badge variant={row.is_active ? "default" : "secondary"}>
            {row.is_active ? "Active" : "Inactive"}
          </Badge>
          {row.is_open_access && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Open Access
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "stats",
      header: "Metrics",
      render: (row) =>
        row.stats ? (
          <div className="text-sm space-y-0.5">
            <div>IF: {row.stats.impact_factor || "N/A"}</div>
            <div className="text-muted-foreground">
              {row.stats.total_articles} articles
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">N/A</span>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center gap-1 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/institution/journals/${row.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/institution/journals/${row.id}/edit`);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Journals</h1>
          <p className="text-text-gray mt-1">
            Create and manage your institution's journals
          </p>
        </div>
        <Link href="/institution/journals/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Journal
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <FilterToolbar>
        <FilterToolbar.Search
          paramName="search"
          placeholder="Search journals..."
        />
      </FilterToolbar>

      {/* Journals Table */}
      <DataTable
        data={journals || []}
        columns={columns}
        isPending={isLoading}
        error={isError ? "Failed to load journals" : null}
        errorMessage="Failed to load journals"
        emptyMessage="No journals yet. Create your first journal to get started."
        hoverable
        onRowClick={(row) => router.push(`/institution/journals/${row.id}`)}
      />
    </div>
  );
}
