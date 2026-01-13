import { Suspense } from "react";
import { PanelContainer, PanelLoadingSkeleton } from "@/features/shared";
import {
  getInstitutionProfile,
  InstitutionProfileView,
} from "@/features/panel/institution";

export default async function InstitutionProfilePage() {
  return (
    <Suspense
      fallback={
        <PanelLoadingSkeleton
          title="Institution Profile"
          description="View and manage your institution profile"
          statsCount={0}
        />
      }
    >
      <InstitutionProfileContent />
    </Suspense>
  );
}

async function InstitutionProfileContent() {
  const profile = await getInstitutionProfile();

  if (!profile) {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Institution Profile
          </h1>
          <p className="mt-2 text-text-gray">
            View and manage your institution profile
          </p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-6 text-destructive">
          Unable to load profile. Please try refreshing the page.
        </div>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Institution Profile</h1>
        <p className="mt-2 text-text-gray">
          View and manage your institution profile
        </p>
      </div>

      <InstitutionProfileView profile={profile} />
    </PanelContainer>
  );
}
