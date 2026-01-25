"use client";

import { PanelContainer, PanelErrorCard } from "@/features/shared";
import { IssueForm, useIssueQuery } from "@/features/panel/institution/issues";
import { IssueBreadcrumb } from "@/features/panel/institution/issues/components/IssueBreadcrumb";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string; issueId: string }>;
}) {
  const { id, issueId } = use(params);

  const { data: issue, isPending, isError } = useIssueQuery(id, issueId);

  if (isError) {
    return (
      <PanelErrorCard
        title="Issue Not Found"
        description="The requested issue could not be found"
      />
    );
  }

  if (isPending) {
    return (
      <PanelContainer>
        <div className="space-y-6">
          <Skeleton className="h-4 w-96" />
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64 mt-1" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <div className="space-y-6">
        <IssueBreadcrumb journalId={id} issueId={issueId} currentPage="edit" />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">Edit Issue</h1>
          <p className="text-text-gray mt-1">
            Update issue details for Volume {issue.volume}, Issue{" "}
            {issue.issue_number}
          </p>
        </div>

        {/* Form */}
        <IssueForm journalId={id} issue={issue} mode="edit" />
      </div>
    </PanelContainer>
  );
}
