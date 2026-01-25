"use client";

import { PanelContainer } from "@/features/shared";
import { IssuesList } from "@/features/panel/institution/issues";
import { IssueBreadcrumb } from "@/features/panel/institution/issues/components/IssueBreadcrumb";
import { use } from "react";

export default function IssuesListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <PanelContainer>
      <IssueBreadcrumb journalId={id} currentPage="list" />
      <IssuesList journalId={id} />
    </PanelContainer>
  );
}
