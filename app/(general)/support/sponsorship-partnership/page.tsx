import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { SponsorshipPartnershipContent } from "@/features/general/support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorship & Partnership Model - Research Index",
  description:
    "Join Nepal Research Index as a sponsor or partner to promote research transparency and accessibility",
};

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
        <SponsorshipPartnershipContent />
      </Container>
    </section>
  );
}
