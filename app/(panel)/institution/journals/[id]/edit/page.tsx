"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PanelContainer,
  PanelLoadingSkeleton,
  PanelErrorCard,
} from "@/features/shared";
import { getJournal } from "@/features/panel/institution/journals/api";
import { JournalForm } from "@/features/panel/institution/journals";

export default function EditJournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const journalId = parseInt(id);

  const {
    data: journal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournal(journalId),
  });

  if (isLoading) {
    return (
      <PanelContainer>
        <PanelLoadingSkeleton
          title="Loading Journal"
          description="Please wait while we load the journal details"
        />
      </PanelContainer>
    );
  }

  if (isError || !journal) {
    return (
      <PanelContainer>
        <PanelErrorCard
          title="Journal Not Found"
          description="The journal you're looking for doesn't exist or you don't have permission to edit it."
        />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <JournalForm mode="edit" journal={journal} />
    </PanelContainer>
  );
}
