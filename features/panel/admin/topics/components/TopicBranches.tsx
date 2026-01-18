"use client";

import { BranchTreeItem } from "./BranchTreeItem";
import BranchFormDialog from "./BranchFormDialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { Topic } from "../types";
import { GitBranchPlus } from "lucide-react";
import * as React from "react";

interface BranchNode {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  level?: number;
  full_path?: string;
  children_count?: number;
  publications_count?: number;
  parent_id?: number | null;
  children?: BranchNode[];
}

interface TopicBranchesProps {
  topic: Topic;
  branches?: BranchNode[];
  onChange?: () => void;
}

export function TopicBranches({
  topic,
  branches,
  onChange,
}: TopicBranchesProps) {
  const branchTree = React.useMemo(() => {
    if (!branches || branches.length === 0) return [];
    // Branches are already in hierarchical structure with children
    return branches;
  }, [branches]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Branch Hierarchy</h3>
        <BranchFormDialog topicPk={topic.id} onSuccess={() => onChange?.()} />
      </div>

      {!branchTree || branchTree.length === 0 ? (
        <EmptyBranchesState />
      ) : (
        <div className="space-y-4 border rounded-lg p-4">
          {branchTree.map((branch) => (
            <BranchTreeItem
              key={branch.id}
              topicPk={topic.id}
              branch={branch}
              level={0}
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
    <div className="space-y-2 border rounded-lg p-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border rounded"
        >
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyBranchesState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-muted/10">
      <div className="text-4xl mb-3">
        <GitBranchPlus className="w-12 h-12 text-muted-foreground mx-auto" />
      </div>
      <h4 className="font-semibold text-lg mb-1">No branches yet</h4>
      <p className="text-sm text-muted-foreground">
        Click &quot;Add Branch&quot; to create your first branch.
      </p>
    </div>
  );
}
