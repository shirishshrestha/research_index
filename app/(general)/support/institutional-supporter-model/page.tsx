import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { InstitutionalSupporterContent } from "@/features/general/support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Supporter Model - Research Index",
  description:
    "Support Nepal's research ecosystem through our institutional supporter model",
};

export default function InstitutionalSupporterModelPage() {
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
        <InstitutionalSupporterContent />
      </Container>
    </section>
  );
}
