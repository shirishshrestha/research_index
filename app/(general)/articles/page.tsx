import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticlesListView } from "@/features/general/articles";
import {
  getPublicPublications,
  type PublicationsResponse,
} from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export const metadata: Metadata = {
  title: "Articles - Resource Index",
  description: "Browse research articles",
};

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
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
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  let articlesData: PublicationsResponse;
  try {
    articlesData = await getPublicPublications(
      {
        type: params.type,
        topic_branch: params.topic_branch
          ? parseInt(params.topic_branch)
          : undefined,
        topic: params.topic ? parseInt(params.topic) : undefined,
        author: params.author ? parseInt(params.author) : undefined,
        journal: params.journal ? parseInt(params.journal) : undefined,
        year: params.year ? parseInt(params.year) : undefined,
        year_from: params.year_from ? parseInt(params.year_from) : undefined,
        year_to: params.year_to ? parseInt(params.year_to) : undefined,
        publisher: params.publisher,
        min_citations: params.min_citations
          ? parseInt(params.min_citations)
          : undefined,
        h_index_min: params.h_index_min
          ? parseInt(params.h_index_min)
          : undefined,
        h_index_max: params.h_index_max
          ? parseInt(params.h_index_max)
          : undefined,
        has_doi:
          params.has_doi === "true"
            ? true
            : params.has_doi === "false"
              ? false
              : undefined,
        has_pdf:
          params.has_pdf === "true"
            ? true
            : params.has_pdf === "false"
              ? false
              : undefined,
        search: params.search,
      },
      {
        page: params.page ? parseInt(params.page) : 1,
        page_size: params.page_size ? parseInt(params.page_size) : 10,
      },
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    articlesData = { results: [], count: 0, next: null, previous: null };
  }

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
          <ArticlesListView
            initialPublications={articlesData.results}
            pagination={articlesData}
          />
        </Suspense>
      </Container>
    </section>
  );
}
