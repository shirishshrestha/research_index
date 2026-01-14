import { Suspense } from "react";
import { PanelContainer, PanelLoadingSkeleton } from "@/features/shared";
import { AuthorProfileView } from "@/features/panel/author/profile/components/AuthorProfileView";
import { getAuthorProfile } from "@/features/panel/author";

// ✅ Removed revalidate = 0 and dynamic = "force-dynamic"
// Now uses cache tags for targeted revalidation

export default async function AuthorProfilePage() {
  return (
    <Suspense
      fallback={
        <PanelLoadingSkeleton
          title="Author Profile"
          description="View and manage your research profile"
          statsCount={0}
        />
      }
    >
      <AuthorProfileContent />
    </Suspense>
  );
}

/**
 * Server Component that fetches profile data
 * Uses Next.js fetch() with cache tag "author-profile"
 * Automatically refetches when cache is revalidated
 */
async function AuthorProfileContent() {
  const profile = await getAuthorProfile();

  if (!profile) {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Author Profile</h1>
          <p className="mt-2 text-text-gray">
            View and manage your research profile
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
        <h1 className="text-4xl font-bold text-primary">Author Profile</h1>
        <p className="mt-2 text-text-gray">
          View and manage your research profile
        </p>
      </div>

      <AuthorProfileView profile={profile} />
    </PanelContainer>
  );
}
