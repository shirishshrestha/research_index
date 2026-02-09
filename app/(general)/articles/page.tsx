import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticlesListView } from "@/features/general/articles";
import { getPublicPublications } from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export const metadata: Metadata = {
  title: "Articles - Resource Index",
  description: "Browse research articles",
};

interface ArticlesPageProps {
  searchParams: {
    type?: string;
    topic_branch?: string;
    topic?: string;
    author?: string;
    journal?: string;
    year?: string;
    year_from?: string;
    year_to?: string;
    publisher?: string;
    min_citations?: string;
    h_index_min?: string;
    h_index_max?: string;
    has_doi?: string;
    has_pdf?: string;
    search?: string;
  };
}

async function getArticles(searchParamsPromise: ArticlesPageProps["searchParams"]) {
  // `searchParams` can be a Promise in some Next.js runtimes — unwrap it safely.
  const searchParams = await Promise.resolve(searchParamsPromise as any);
  try {
    return await getPublicPublications({
      type: searchParams?.type,
      topic_branch: searchParams?.topic_branch ? parseInt(searchParams.topic_branch) : undefined,
      topic: searchParams?.topic ? parseInt(searchParams.topic) : undefined,
      author: searchParams?.author ? parseInt(searchParams.author) : undefined,
      journal: searchParams?.journal ? parseInt(searchParams.journal) : undefined,
      year: searchParams?.year ? parseInt(searchParams.year) : undefined,
      year_from: searchParams?.year_from ? parseInt(searchParams.year_from) : undefined,
      year_to: searchParams?.year_to ? parseInt(searchParams.year_to) : undefined,
      publisher: searchParams?.publisher,
      min_citations: searchParams?.min_citations ? parseInt(searchParams.min_citations) : undefined,
      h_index_min: searchParams?.h_index_min ? parseInt(searchParams.h_index_min) : undefined,
      h_index_max: searchParams?.h_index_max ? parseInt(searchParams.h_index_max) : undefined,
      has_doi: searchParams?.has_doi === 'true' ? true : searchParams?.has_doi === 'false' ? false : undefined,
      has_pdf: searchParams?.has_pdf === 'true' ? true : searchParams?.has_pdf === 'false' ? false : undefined,
      search: searchParams?.search,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const publications = await getArticles(searchParams);

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
        <Suspense fallback={<FullScreenLoader />}>
          <ArticlesListView initialPublications={publications} />
        </Suspense>
      </Container>
    </section>
  );
}
