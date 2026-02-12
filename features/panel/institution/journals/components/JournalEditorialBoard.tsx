"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Plus, Pencil, Trash2 } from "lucide-react";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import type { EditorialBoardMember } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { EllipsisTooltip } from "@/features/shared/components/lists/Ellipsis";
import { EditorialBoardMemberDialog } from "./EditorialBoardMemberDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEditorialBoardMember } from "../api";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface JournalEditorialBoardProps {
  members?: EditorialBoardMember[];
  isPending?: boolean;
}

export function JournalEditorialBoard({
  members,
  isPending,
}: JournalEditorialBoardProps) {
  const params = useParams();
  const journalId = parseInt(params.id as string);
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<EditorialBoardMember | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const deleteMutation = useMutation({
    mutationFn: (memberId: number) =>
      deleteEditorialBoardMember(journalId, memberId),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member deleted successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
      setDeleteDialogOpen(false);
      setSelectedMember(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete editorial board member");
    },
  });

  const handleCreate = () => {
    setSelectedMember(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleEdit = (member: EditorialBoardMember) => {
    setSelectedMember(member);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDeleteClick = (member: EditorialBoardMember) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedMember) {
      deleteMutation.mutate(selectedMember.id);
    }
  };
  if (isPending) {
    return (
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 heading-4 text-primary!">
              <Users className="h-5 w-5" />
              Editorial Board
            </span>
            <Skeleton className="h-6 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!members) {
    return null;
  }
  const columns: DataTableColumn<EditorialBoardMember>[] = [
    {
      key: "member",
      header: "Member",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.photo_url} alt={row.name} />
            <AvatarFallback>
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            {row.title && (
              <p className="text-xs text-muted-foreground">{row.title}</p>
            )}
          </div>
        </div>
      ),
      cellClassName: "min-w-[200px]",
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge variant="secondary">{row.role_display || row.role}</Badge>
      ),
    },
    {
      key: "affiliation",
      header: "Affiliation",
      render: (row) => (
        <EllipsisTooltip text={row.affiliation || "N/A"} maxLength={35} />
      ),
    },
    {
      key: "expertise",
      header: "Expertise",
      render: (row) => (
        <EllipsisTooltip text={row.expertise || "-"} maxLength={35} />
      ),
    },
    {
      key: "links",
      header: "Links",
      align: "center",
      render: (row) => (
        <div className="flex items-center gap-2 justify-center">
          {row.orcid && (
            <a
              href={`https://orcid.org/${row.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs"
              title="ORCID Profile"
            >
              ORCID
            </a>
          )}
          {row.website && (
            <a
              href={row.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
              title="Website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {!row.orcid && !row.website && (
            <span className="text-muted-foreground text-xs">-</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (row) => (
        <div className="flex items-center gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(row)}
            title="Delete"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 heading-4 text-primary!">
              <Users className="h-5 w-5" />
              Editorial Board
            </span>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{members?.length || 0} Members</Badge>
              <Button onClick={handleCreate} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={members || []}
            columns={columns}
            emptyMessage="No editorial board members added yet"
            hoverable
          />
        </CardContent>
      </Card>

      <EditorialBoardMemberDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        journalId={journalId}
        member={selectedMember || undefined}
        mode={dialogMode}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Editorial Board Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedMember?.name}</strong> from the editorial board?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
