"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileTabs } from "@/features/shared/components/profile";
import { createCurrentUserQueryOptions } from "@/features/shared";
import {
  AccountStatusCard,
  ChangePasswordForm,
  DeactivateAccountForm,
  DeleteAccountForm,
} from "./";

export function AccountTab() {
  const { data: userData } = useQuery(createCurrentUserQueryOptions);
  const isAdmin = userData?.user_type === "admin";

  // Change Password tab content
  const changePasswordContent = (
    <div className="space-y-6">
      <ChangePasswordForm />
    </div>
  );

  // Deactivate Account tab content
  const deactivateAccountContent = (
    <div className="space-y-6">
      <DeactivateAccountForm />
    </div>
  );

  // Delete Account tab content
  const deleteAccountContent = (
    <div className="space-y-6">
      <DeleteAccountForm />
    </div>
  );

  // Build tabs array based on user type
  const tabs = [
    {
      label: "Change Password",
      value: "change-password",
      content: changePasswordContent,
    },
  ];

  // Add deactivate and delete tabs only if not admin
  if (!isAdmin) {
    tabs.push(
      {
        label: "Deactivate Account",
        value: "deactivate-account",
        content: deactivateAccountContent,
      },
      {
        label: "Delete Account",
        value: "delete-account",
        content: deleteAccountContent,
      }
    );
  }

  return (
    <div className="space-y-8">
      <AccountStatusCard />

      {/* Sub-tabs for account actions */}
      <ProfileTabs className="mt-0! pt-0!" paramKey="action" tabs={tabs} />
    </div>
  );
}
