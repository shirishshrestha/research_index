import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { AuthorsListView } from "@/features/general/authors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors - Resource Index",
  description:
    "Explore our growing list of authors contributing to Nepal's research excellence across diverse disciplines.",
};

export default function AuthorsPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Contributors", href: "#" },
            commonBreadcrumbs.authors,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Empowering Authors, Showcasing Knowledge"
        para="The Nepal Research Indexing Platform celebrates the scholars behind every discovery. Explore our growing list of authors contributing to Nepal's research excellence across diverse disciplines. Together, we strengthen visibility, foster collaboration, and advance global academic impact."
      />

      <Container>
        <AuthorsListView />
      </Container>
    </section>
  );
}
