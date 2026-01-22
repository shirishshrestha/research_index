"use client";

import { PanelContainer } from "@/features/shared";
import { IssueForm } from "@/features/panel/institution/issues";
import { IssueBreadcrumb } from "@/features/panel/institution/issues/components/IssueBreadcrumb";
import { use } from "react";

export default function CreateIssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <PanelContainer>
      <div className="space-y-6">
        <IssueBreadcrumb journalId={id} currentPage="create" />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">Create Issue</h1>
          <p className="text-text-gray mt-1">Add a new issue to your journal</p>
        </div>

        {/* Form */}
        <IssueForm journalId={id} mode="create" />
      </div>
    </PanelContainer>
  );
}
