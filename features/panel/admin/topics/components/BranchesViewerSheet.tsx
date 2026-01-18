"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, FolderTree } from "lucide-react";
import type { Topic, TopicBranch } from "@/features/general/topics/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BranchesViewerSheetProps {
  topic: Topic;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BranchesViewerSheet({
  topic,
  open,
  onOpenChange,
}: BranchesViewerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {topic.icon && <span className="text-2xl">{topic.icon}</span>}
            {topic.name}
          </SheetTitle>
          <SheetDescription>{topic.description}</SheetDescription>
          <div className="flex gap-3 pt-2">
            <Badge variant="secondary" className="gap-1.5">
              <FolderTree className="w-3.5 h-3.5" />
              {topic.branches_count} branches
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {topic.publications_count} publications
            </Badge>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Branch Hierarchy
          </h3>
          <ScrollArea className="h-[calc(100vh-240px)]">
            {topic.branches && topic.branches.length > 0 ? (
              <div className="space-y-4">
                {topic.branches.map((branch) => (
                  <BranchTreeItem key={branch.id} branch={branch} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FolderTree className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  No branches found for this topic
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BranchTreeItem({
  branch,
  level = 0,
}: {
  branch: TopicBranch;
  level?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
  const hasChildren = branch.children && branch.children.length > 0;

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/50",
          level > 0 && "ml-4"
        )}
        style={{ marginLeft: `${level * 1.5}rem` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-muted rounded transition-transform"
          >
            <ChevronRight
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        ) : (
          <div className="w-5" />
        )}

        <div className="flex-1 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{branch.name}</p>
            {branch.description && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {branch.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="outline"
              className="text-xs font-normal border-blue-200 bg-blue-50 text-blue-700"
            >
              L{branch.level}
            </Badge>
            {branch.publications_count > 0 && (
              <Badge
                variant="outline"
                className="text-xs font-normal border-green-200 bg-green-50 text-green-700"
              >
                {branch.publications_count}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {branch.children!.map((child) => (
            <BranchTreeItem key={child.id} branch={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
