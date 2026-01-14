"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import TopicFormDialog from "./TopicFormDialog";
import { TopicBranches } from "./TopicBranches";
import { useDeleteTopicMutation } from "../hooks/mutations";
import type { Topic } from "../types";

interface TopicItemProps {
  topic: Topic;
  onUpdate: () => void;
}

export function TopicItem({ topic, onUpdate }: TopicItemProps) {
  const deleteTopic = useDeleteTopicMutation(topic.id, {
    onSuccess: () => {
      onUpdate();
    },
  });

  const handleDelete = () => {
    deleteTopic.mutate();
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-medium">{topic.name}</div>
          <div className="text-sm text-muted-foreground">
            {topic.count ?? 0}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TopicFormDialog topic={topic} onSuccess={onUpdate} />
          <ConfirmationPopup
            triggerButton={
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            }
            title="Confirm delete"
            description="Are you sure you want to delete this topic? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            variant="danger"
            onConfirm={handleDelete}
            isPending={deleteTopic.isPending}
            isSuccess={deleteTopic.isSuccess}
          />
        </div>
      </div>
      <div className="mt-3">
        <TopicBranches topic={topic} onChange={onUpdate} />
      </div>
    </div>
  );
}
