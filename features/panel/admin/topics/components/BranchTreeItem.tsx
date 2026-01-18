"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConfirmationPopup } from "@/features/shared/components/dialog/ConfirmationPopup";
import BranchFormDialog from "./BranchFormDialog";
import { useDeleteBranchMutation } from "../hooks/mutations";
import { GitBranch, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface BranchTreeItemProps {
  topicPk: number | string;
  branch: BranchNode;
  level: number;
  onUpdate: () => void;
}

export function BranchTreeItem({
  topicPk,
  branch,
  level,
  onUpdate,
}: BranchTreeItemProps) {
  const hasChildren = branch.children && branch.children.length > 0;

  const deleteBranch = useDeleteBranchMutation(topicPk, branch.id, {
    onSuccess: () => {
      onUpdate();
    },
  });

  const handleDelete = () => {
    deleteBranch.mutate();
  };

  const indentPx = level * 24;

  if (!hasChildren) {
    // Leaf node without children - simple display
    return (
      <div
        className={cn(
          "flex items-center  justify-between p-3 rounded-md hover:bg-accent/10! transition-colors group bg-card!",
          level === 0 ? "bg-muted/20" : ""
        )}
        style={{ paddingLeft: `${indentPx + 12}px` }}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="h-6 w-6 flex items-center justify-center">
            <GitBranch className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{branch.name}</span>
            {branch.description && (
              <span className="text-xs text-muted-foreground">
                • {branch.description}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <BranchFormDialog
            topicPk={topicPk}
            parentBranchId={branch.id}
            branchName={branch.name}
            onSuccess={onUpdate}
          >
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </BranchFormDialog>

          <BranchFormDialog
            topicPk={topicPk}
            branch={{
              id: branch.id,
              topic: Number(topicPk),
              parent: branch.parent_id ?? null,
              name: branch.name,
              slug: branch.slug,
              description: branch.description,
              is_active: true,
              order: 0,
            }}
            onSuccess={onUpdate}
          >
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </BranchFormDialog>

          <ConfirmationPopup
            triggerButton={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Confirm delete"
            description={`Are you sure you want to delete "${branch.name}"? This will also delete all its sub-branches. This action cannot be undone.`}
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

  // Branch with children - use accordion
  return (
    <div className="w-full bg-card" style={{ paddingLeft: `${indentPx}px` }}>
      <Accordion type="single" collapsible defaultValue="open">
        <AccordionItem value="open" className="border-0">
          <div
            className={cn(
              "flex items-center justify-between rounded-md hover:bg-accent/10 transition-colors group",
              level === 0 ? "bg-muted/20" : ""
            )}
          >
            <AccordionTrigger className="flex-1 w-full py-3 px-3 hover:no-underline ">
              <div className="flex items-center gap-2 w-full">
                <span className="font-medium text-sm">{branch.name}</span>
                {branch.description && (
                  <span className="text-xs text-muted-foreground">
                    • {branch.description}
                  </span>
                )}
              </div>
            </AccordionTrigger>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity px-3">
              <BranchFormDialog
                topicPk={topicPk}
                parentBranchId={branch.id}
                branchName={branch.name}
                onSuccess={onUpdate}
              >
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </BranchFormDialog>

              <BranchFormDialog
                topicPk={topicPk}
                branch={{
                  id: branch.id,
                  topic: Number(topicPk),
                  parent: branch.parent_id ?? null,
                  name: branch.name,
                  slug: branch.slug,
                  description: branch.description,
                  is_active: true,
                  order: 0,
                }}
                onSuccess={onUpdate}
              >
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Pencil className="h-4 w-4" />
                </Button>
              </BranchFormDialog>

              <ConfirmationPopup
                triggerButton={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                }
                title="Confirm delete"
                description={`Are you sure you want to delete "${branch.name}"? This will also delete all its sub-branches. This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                onConfirm={handleDelete}
                isPending={deleteBranch.isPending}
                isSuccess={deleteBranch.isSuccess}
              />
            </div>
          </div>

          {/* Children (Recursive) */}
          <AccordionContent className="pb-0">
            <div className="space-y-1 pt-1">
              {branch.children?.map((child) => (
                <BranchTreeItem
                  key={child.id}
                  topicPk={topicPk}
                  branch={child}
                  level={level + 1}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
