"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PanelContainer,
  PanelLoadingSkeleton,
  PanelErrorCard,
} from "@/features/shared";
import { getJournal } from "@/features/panel/institution/journals/api";
import {
  JournalHeader,
  JournalBasicInfo,
  JournalStatistics,
  JournalContact,
  JournalEditorialBoard,
  JournalBreadcrumb,
} from "@/features/panel/institution/journals/components";

export default function JournalDetailPage({
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
          description="The journal you're looking for doesn't exist."
        />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <JournalBreadcrumb
        journalId={journal.id}
        journalTitle={journal.title}
        currentPage="detail"
      />

      <div className="space-y-6">
        <JournalHeader journal={journal} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Basic Info & Editorial Board */}
          <div className="space-y-6 lg:col-span-2">
            <JournalBasicInfo journal={journal} />
            <JournalEditorialBoard members={journal.editorial_board} />
          </div>

          {/* Right Column - Statistics & Contact */}
          <div className="space-y-6">
            <JournalStatistics journal={journal} />
            <JournalContact journal={journal} />
          </div>
        </div>
      </div>
    </PanelContainer>
  );
}
