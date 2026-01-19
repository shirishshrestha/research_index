import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { TopicDetailView, getTopic } from "@/features/general/topics";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Topic Details - ${id} - Resource Index`,
    description: "Browse topic hierarchy and publications",
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            commonBreadcrumbs.topics,
            { label: "Topic Details", href: `/topics/${id}` },
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Explore Fields, Expand Knowledge"
        para="The Nepal Research Indexing Platform organizes research into diverse academic categories. Discover topics that connect disciplines, foster innovation, and highlight Nepal’s growing role in global scholarly advancement."
      />

      <Container>
        <Suspense fallback={<FullScreenLoader />}>
          <TopicDetailContent topicId={id} />
        </Suspense>
      </Container>
    </section>
  );
}

/**
 * Server Component that fetches topic data
 * Uses Next.js fetch() with cache tag "topics-tree"
 * Automatically refetches when cache is revalidated
 */
async function TopicDetailContent({ topicId }: { topicId: string }) {
  const topicData = await getTopic(topicId);

  if (!topicData) {
    notFound();
  }

  return <TopicDetailView topic={topicData} />;
}
