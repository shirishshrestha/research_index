import { Suspense } from "react";
import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { InstitutionalSupporterContentServer } from "@/features/general/support/components/InstitutionalSupporterContentServer";
import { SupportPageSkeleton } from "@/features/general/support/components/SupportPageSkeleton";
import { getSupportPage } from "@/features/general/support/api.server";
import { Metadata } from "next";

// Force runtime rendering to avoid build-time fetch issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Institutional Supporter Model - Research Index",
  description:
    "Support Nepal's research ecosystem through our institutional supporter model",
};

async function getInstitutionalSupporterData() {
  try {
    return await getSupportPage("institutional_supporter");
  } catch (error) {
    console.error("Error fetching institutional supporter page:", error);
    return null;
  }
}

export default async function InstitutionalSupporterModelPage() {
  const data = await getInstitutionalSupporterData();

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Support", href: "/support" },
            {
              label: "Institutional Supporter Model",
              href: "/support/institutional-supporter-model",
            },
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Institutional Supporter Model"
        para="Academic and research institutions can become Nepal Research Index (NRI) supporters to build an open and sustainable research ecosystem that connects authors, journals, and institutions across Nepal and beyond."
      />

      <Container>
        <Suspense fallback={<SupportPageSkeleton />}>
          {data ? (
            <InstitutionalSupporterContentServer data={data} />
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
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
