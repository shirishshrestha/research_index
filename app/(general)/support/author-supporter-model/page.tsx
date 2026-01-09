import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { AuthorSupporterContent } from "@/features/general/support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Supporter Model - Research Index",
  description: "Join Nepal's research community as an author supporter",
};

export default function AuthorSupporterModelPage() {
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
        <AuthorSupporterContent />
      </Container>
    </section>
  );
}
