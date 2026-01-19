import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { TopicsListView } from "@/features/general/topics";
import { getTopicsTree } from "@/features/general/topics";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export const metadata: Metadata = {
  title: "Topics - Resource Index",
  description: "Browse research topics and categories",
};

export default async function TopicsPage() {
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
        <Suspense fallback={<FullScreenLoader />}>
          <TopicsContent />
        </Suspense>
      </Container>
    </section>
  );
}

/**
 * Server Component that fetches topics data
 * Uses Next.js fetch() with cache tag "topics-tree"
 * Automatically refetches when cache is revalidated
 */
async function TopicsContent() {
  const topics = await getTopicsTree();

  return <TopicsListView initialTopics={topics} />;
}
