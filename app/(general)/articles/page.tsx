import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  ArticlesListView,
  ArticlesListSkeleton,
} from "@/features/general/articles";
import { getPublicPublications } from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Articles - Resource Index",
  description: "Browse research articles",
};

interface ArticlesPageProps {
  searchParams: {
    type?: string;
    topic_branch?: string;
    author?: string;
    search?: string;
  };
}

export default function ArticlesPage({ searchParams }: ArticlesPageProps) {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Research", href: "#" },
            commonBreadcrumbs.articles,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Explore Research Articles"
        para="Discover cutting-edge research from Nepal and beyond. Browse through peer-reviewed articles, publications, and scholarly works across diverse academic disciplines. Access open research and contribute to the global knowledge ecosystem."
      />

      <Container>
        <Suspense fallback={<ArticlesListSkeleton />}>
          <ArticlesContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}

/**
 * Server Component that fetches articles data
 * Uses Next.js fetch() with cache tag "public-publications"
 * Automatically refetches when cache is revalidated
 */
async function ArticlesContent({
  searchParams,
}: {
  searchParams: ArticlesPageProps["searchParams"];
}) {
  let publications;
  let error = null;

  try {
    publications = await getPublicPublications({
      type: searchParams.type,
      topic_branch: searchParams.topic_branch
        ? parseInt(searchParams.topic_branch)
        : undefined,
      author: searchParams.author ? parseInt(searchParams.author) : undefined,
      search: searchParams.search,
    });
  } catch (err) {
    console.error("Failed to fetch publications:", err);
    error = err;
  }

  // Handle error case
  if (error || !publications) {
    return (
      <div className="text-center py-20">
        <p className="text-text-gray text-lg">
          Unable to load articles. Please try again later.
        </p>
      </div>
    );
  }

  // Render success case
  return <ArticlesListView initialPublications={publications} />;
}
