import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { JournalsListView } from "@/features/general/journals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journals - Resource Index",
  description: "Browse academic journals",
};

export default function JournalsPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            commonBreadcrumbs.journals,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Advancing Journals, Elevating Research"
        para="The Nepal Research Indexing Platform highlights journals that drive scholarly communication and innovation. Discover a curated collection of academic journals contributing to Nepal's research growth across diverse disciplines. "
      />

      <Container>
        <JournalsListView />
      </Container>
    </section>
  );
}
