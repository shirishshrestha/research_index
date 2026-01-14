"use client";

import { TopicList } from "@/features/panel/admin";
import { PanelContainer } from "@/features/shared";

export default function AdminTopicsPage() {
  return (
    <PanelContainer>
      <div className="py-6">
        <TopicList />
      </div>
    </PanelContainer>
  );
}
