import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { TopicDetailView } from "@/features/general/topics";
import { Metadata } from "next";
import { Suspense } from "react";

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
        <Suspense
          fallback={
            <div className="py-20 text-center">Loading topic details...</div>
          }
        >
          <TopicDetailView topicId={id} />
        </Suspense>
      </Container>
    </section>
  );
}
