"use client";

import * as React from "react";
import { useTopicBranchesQuery } from "../hooks/queries";
import { BranchItem } from "./BranchItem";
import BranchFormDialog from "./BranchFormDialog";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Topic, TopicBranch } from "../types";

interface TopicBranchesProps {
  topic: Topic;
  onChange?: () => void;
}

export function TopicBranches({ topic, onChange }: TopicBranchesProps) {
  const branches = useTopicBranchesQuery(topic.id);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Branches</h3>
        <BranchFormDialog topicPk={topic.id} onSuccess={() => onChange?.()} />
      </div>

      {branches.isLoading ? (
        <BranchesLoadingSkeleton />
      ) : branches.isError ? (
        <ErrorCard
          title="Failed to load branches"
          message="We couldn't load the branches for this topic."
          onRetry={() => branches.refetch()}
        />
      ) : !branches.data?.results || branches.data.results.length === 0 ? (
        <EmptyBranchesState />
      ) : (
        <div className="grid gap-2">
          {branches.data.results.map((b: TopicBranch) => (
            <BranchItem
              key={b.id}
              topicPk={topic.id}
              branch={b}
              onUpdate={() => onChange?.()}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BranchesLoadingSkeleton() {
  return (
    <div className="grid gap-2">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-2 border rounded"
        >
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyBranchesState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg bg-muted/10">
      <div className="text-3xl mb-2">🌿</div>
      <p className="text-sm text-muted-foreground">
        No branches yet. Click &quot;Add Branch&quot; to create one.
      </p>
    </div>
  );
}
