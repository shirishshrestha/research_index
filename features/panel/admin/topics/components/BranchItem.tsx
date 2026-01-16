"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import BranchFormDialog from "./BranchFormDialog";
import { useDeleteBranchMutation } from "../hooks/mutations";
import type { TopicBranch } from "../types";
import { Trash2 } from "lucide-react";

interface BranchItemProps {
  topicPk: number | string;
  branch: TopicBranch;
  onUpdate: () => void;
}

export function BranchItem({ topicPk, branch, onUpdate }: BranchItemProps) {
  const deleteBranch = useDeleteBranchMutation(topicPk, branch.id, {
    onSuccess: () => {
      onUpdate();
    },
  });

  const handleDelete = () => {
    deleteBranch.mutate();
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div>{branch.name}</div>
      <div className="flex items-center gap-2">
        <BranchFormDialog
          topicPk={topicPk}
          branch={branch}
          onSuccess={onUpdate}
        />
        <ConfirmationPopup
          triggerButton={
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive hover:border-destructive"
              size="sm"
            >
              <Trash2 />
            </Button>
          }
          title="Confirm delete"
          description="Are you sure you want to delete this branch? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onConfirm={handleDelete}
          isPending={deleteBranch.isPending}
          isSuccess={deleteBranch.isSuccess}
        />
      </div>
    </div>
  );
}
