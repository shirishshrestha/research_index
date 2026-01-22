"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { PanelContainer, PanelErrorCard } from "@/features/shared";
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
    isPending,
    isError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournal(journalId),
  });

  if (isError) {
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
        journalId={journal?.id}
        journalTitle={journal?.title}
        currentPage="detail"
      />

      <div className="space-y-6">
        <JournalHeader journal={journal} isPending={isPending} />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Basic Info & Editorial Board */}
          <div className="space-y-6 lg:col-span-2">
            <JournalBasicInfo journal={journal} isPending={isPending} />
            <JournalEditorialBoard
              members={journal?.editorial_board}
              isPending={isPending}
            />
          </div>

          {/* Right Column - Statistics & Contact */}
          <div className="space-y-6">
            <JournalStatistics journal={journal} isPending={isPending} />
            <JournalContact journal={journal} isPending={isPending} />
          </div>
        </div>
      </div>
    </PanelContainer>
  );
}
