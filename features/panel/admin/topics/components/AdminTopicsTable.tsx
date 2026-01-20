"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTopicTreeQuery } from "../hooks/queries";
import { useDeleteTopicMutation } from "../hooks/mutations";
import { Button } from "@/components/ui/button";
import DataTable from "@/features/shared/components/DataTable";
import type { DataTableColumn } from "@/features/shared/components/DataTable";
import { FilterToolbar } from "@/features/shared/components/search/FilterToolbar";
import TopicFormDialog from "./TopicFormDialog";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import { GitBranch, Pencil, Trash2 } from "lucide-react";
import type { Topic } from "../types";

export function AdminTopicsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const topics = useTopicTreeQuery(searchQuery);

  const columns: DataTableColumn<Topic>[] = [
    {
      key: "name",
      header: "Name",
      accessor: (row) => row.name,
      cellClassName: "font-medium",
    },
    {
      key: "description",
      header: "Description",
      accessor: (row) => row.description || "-",
      cellClassName: "max-w-md truncate",
    },
    {
      key: "branches_count",
      header: "Branches",
      render: (row) => row.branches_count,
    },
    {
      key: "publications_count",
      header: "Publications",
      accessor: (row) => row.publications_count,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <TopicActions topic={row} onUpdate={() => topics.refetch()} />
      ),
    },
  ];

  const handleRowClick = (topic: Topic) => {
    router.push(`/admin/topics/${topic.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <FilterToolbar className="flex-1">
          <FilterToolbar.Search
            paramName="search"
            placeholder="Search topics..."
            debounceMs={500}
          />
        </FilterToolbar>
        <TopicFormDialog onSuccess={() => topics.refetch()} />
      </div>

      <DataTable
        data={topics.data || []}
        columns={columns}
        isPending={topics.isLoading}
        error={topics.error}
        emptyMessage={
          searchQuery
            ? "No topics match your search criteria."
            : "No topics found. Get started by creating your first topic."
        }
        errorMessage="Failed to load topics"
        hoverable
        onRowClick={handleRowClick}
      />
    </div>
  );
}

interface TopicActionsProps {
  topic: Topic;
  onUpdate: () => void;
}

function TopicActions({ topic, onUpdate }: TopicActionsProps) {
  const router = useRouter();
  const deleteTopic = useDeleteTopicMutation(topic.id, {
    onSuccess: () => {
      onUpdate();
    },
  });

  const handleDelete = () => {
    deleteTopic.mutate();
  };

  const handleViewBranches = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/admin/topics/${topic.id}`);
  };

  return (
    <div
      className="flex items-center justify-end gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <TopicFormDialog topic={topic} onSuccess={onUpdate}>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </TopicFormDialog>
      <ConfirmationPopup
        triggerButton={
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive hover:border-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
        title="Confirm delete"
        description={`Are you sure you want to delete "${topic.name}"? This will also delete all its branches. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        isPending={deleteTopic.isPending}
        isSuccess={deleteTopic.isSuccess}
      />
      <Button variant="outline" size="sm" onClick={handleViewBranches}>
        <GitBranch className="mr-2 h-4 w-4" />
        Branches
      </Button>
    </div>
  );
}
