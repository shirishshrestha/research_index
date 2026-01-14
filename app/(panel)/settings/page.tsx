"use client";

import { ProfileTabs } from "@/features/shared/components/profile";
import { PanelContainer } from "@/features/shared";
import { AccountTab, EmailLogsTab } from "@/features/panel/settings";

export default function SettingsPage() {
  return (
    <PanelContainer>
      {/* Header */}
      <div className="">
        <h1 className="text-4xl font-bold text-primary">Settings</h1>
        <p className="mt-2 text-text-gray">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <ProfileTabs
        paramKey="tab"
        className="mt-2!"
        clearParamsOnTabSwitch={{ account: ["action"] }}
        tabs={[
          {
            label: "Account",
            value: "account",
            content: <AccountTab />,
          },
          {
            label: "Email Logs",
            value: "email-logs",
            content: <EmailLogsTab />,
          },
        ]}
      />
    </PanelContainer>
  );
}
