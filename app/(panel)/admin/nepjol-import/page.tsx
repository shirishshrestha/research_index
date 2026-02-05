"use client";

import { PanelContainer } from "@/features/shared";
import { NepJOLImportManager } from "@/features/panel/admin/nepjol";

export default function NepJOLImportPage() {
  return (
    <PanelContainer>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2 text-primary!">NepJOL Import Management</h1>
          <p className="text-muted-foreground mt-2">
            Import journals and publications from NepJOL (Nepal Journals Online)
          </p>
        </div>
        <NepJOLImportManager />
      </div>
    </PanelContainer>
  );
}
