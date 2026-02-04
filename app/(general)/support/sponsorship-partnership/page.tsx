import { Suspense } from "react";
import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { SponsorshipPartnershipContentServer } from "@/features/general/support/components/SponsorshipPartnershipContentServer";
import { SupportPageSkeleton } from "@/features/general/support/components/SupportPageSkeleton";
import { getSupportPage } from "@/features/general/support/api.server";
import { Metadata } from "next";

// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sponsorship & Partnership Model - Research Index",
  description:
    "Join Nepal Research Index as a sponsor or partner to promote research transparency and accessibility",
};

async function SponsorshipPartnershipData() {
  const data = await getSupportPage("sponsorship_partnership");

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-red-500">Failed to load support page content.</p>
      </div>
    );
  }

  return <SponsorshipPartnershipContentServer data={data} />;
}

export default function SponsorshipPartnershipPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Support", href: "/support" },
            {
              label: "Sponsorship & Partnership",
              href: "/support/sponsorship-partnership",
            },
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Sponsorship & Partnership Model"
        para="In addition to authors, institutions, and partners, the Nepal Research Index (NRI) also welcomes organizations and agencies to become sponsors, contributing to the long-term sustainability of our research and knowledge visibility."
      />

      <Container>
        <Suspense fallback={<SupportPageSkeleton />}>
          <SponsorshipPartnershipData />
        </Suspense>
      </Container>
    </section>
  );
}
