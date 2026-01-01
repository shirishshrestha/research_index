import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { TopicsListView } from "@/features/general/topics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics - Resource Index",
  description: "Browse research topics and categories",
};

export default function TopicsPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            commonBreadcrumbs.topics,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Explore Fields, Expand Knowledge"
        para="The Nepal Research Indexing Platform organizes research into diverse scholarly categories. Explore topics that drive Nepal's academic progress and digital growth, ranging from environmental studies to technology and beyond."
      />

      <Container>
        <TopicsListView />
      </Container>
    </section>
  );
}
