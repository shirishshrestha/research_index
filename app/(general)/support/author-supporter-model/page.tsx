import { Suspense } from "react";
import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { AuthorSupporterContentServer } from "@/features/general/support/components/AuthorSupporterContentServer";
import { SupportPageSkeleton } from "@/features/general/support/components/SupportPageSkeleton";
import { getSupportPage } from "@/features/general/support/api.server";
import { Metadata } from "next";

// Force runtime rendering to avoid build-time fetch issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Author Supporter Model - Research Index",
  description: "Join Nepal's research community as an author supporter",
};

async function getAuthorSupporterData() {
  try {
    return await getSupportPage("author_supporter");
  } catch (error) {
    console.error("Error fetching author supporter page:", error);
    return null;
  }
}

export default async function AuthorSupporterModelPage() {
  const data = await getAuthorSupporterData();

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Support", href: "/support" },
            {
              label: "Author Supporter Model",
              href: "/support/author-supporter-model",
            },
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Author Supporter Model"
        para="The Nepal Research Index thrives through the active participation of authors who believe in accessible, transparent, and globally visible research. Join us in maintaining and expanding the national research infrastructure."
      />

      <Container>
        <Suspense fallback={<SupportPageSkeleton />}>
          {data ? (
            <AuthorSupporterContentServer data={data} />
          ) : (
            <div className="flex items-center justify-center min-h-100">
              <p className="text-red-500">
                Failed to load support page content.
              </p>
            </div>
          )}
        </Suspense>
      </Container>
    </section>
  );
}
