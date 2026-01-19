"use client";

import { PanelContainer } from "@/features/shared";
import { JournalsList } from "@/features/panel/institution/journals";

export default function JournalsListPage() {
  return (
    <PanelContainer>
      <JournalsList />
    </PanelContainer>
  );
}
