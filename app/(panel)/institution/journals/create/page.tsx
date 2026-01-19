"use client";

import { PanelContainer } from "@/features/shared";
import { JournalForm } from "@/features/panel/institution/journals";

export default function CreateJournalPage() {
  return (
    <PanelContainer>
      <JournalForm mode="create" />
    </PanelContainer>
  );
}
