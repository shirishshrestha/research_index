"use client";

import { PanelContainer } from "@/features/shared";
import {
  JournalForm,
  JournalBreadcrumb,
} from "@/features/panel/institution/journals";

export default function CreateJournalPage() {
  return (
    <PanelContainer>
      <JournalBreadcrumb currentPage="create" />
      <JournalForm mode="create" />
    </PanelContainer>
  );
}
