import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  AuthorsListView,
  AuthorsListSkeleton,
} from "@/features/general/authors";
import {
  getPublicAuthors,
  type AuthorsResponse,
} from "@/features/general/authors/api/authors.server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authors - Resource Index",
  description:
    "Explore our growing list of authors contributing to Nepal's research excellence across diverse disciplines.",
};

interface AuthorsPageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    title?: string;
    institute?: string;
    designation?: string;
    gender?: string;
    degree?: string;
    research_interest?: string;
    h_index_min?: string;
    h_index_max?: string;
    i10_index_min?: string;
    i10_index_max?: string;
    min_citations?: string;
    max_citations?: string;
    min_publications?: string;
    max_publications?: string;
    has_orcid?: string;
    has_google_scholar?: string;
    has_website?: string;
    search?: string;
  };
}

async function AuthorsContent({
  searchParams,
}: {
  searchParams:
    | AuthorsPageProps["searchParams"]
    | Promise<AuthorsPageProps["searchParams"]>;
}) {
  const params = await searchParams;
  let authorsData: AuthorsResponse;

  try {
    authorsData = await getPublicAuthors(
      {
        title: params?.title,
        institute: params?.institute,
        designation: params?.designation,
        gender: params?.gender,
        degree: params?.degree,
        research_interest: params?.research_interest,
        h_index_min: params?.h_index_min
          ? parseInt(params.h_index_min)
          : undefined,
        h_index_max: params?.h_index_max
          ? parseInt(params.h_index_max)
          : undefined,
        i10_index_min: params?.i10_index_min
          ? parseInt(params.i10_index_min)
          : undefined,
        i10_index_max: params?.i10_index_max
          ? parseInt(params.i10_index_max)
          : undefined,
        min_citations: params?.min_citations
          ? parseInt(params.min_citations)
          : undefined,
        max_citations: params?.max_citations
          ? parseInt(params.max_citations)
          : undefined,
        min_publications: params?.min_publications
          ? parseInt(params.min_publications)
          : undefined,
        max_publications: params?.max_publications
          ? parseInt(params.max_publications)
          : undefined,
        has_orcid:
          params?.has_orcid === "true"
            ? true
            : params?.has_orcid === "false"
              ? false
              : undefined,
        has_google_scholar:
          params?.has_google_scholar === "true"
            ? true
            : params?.has_google_scholar === "false"
              ? false
              : undefined,
        has_website:
          params?.has_website === "true"
            ? true
            : params?.has_website === "false"
              ? false
              : undefined,
        search: params?.search,
      },
      {
        page: params?.page ? parseInt(params.page) : 1,
        page_size: params?.page_size ? parseInt(params.page_size) : 10,
      },
    );
  } catch (error) {
    console.error("Error fetching authors:", error);
    authorsData = { results: [], count: 0, next: null, previous: null };
  }

  return (
    <AuthorsListView
      initialData={authorsData.results}
      pagination={authorsData}
    />
  );
}

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
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
        <Suspense fallback={<AuthorsListSkeleton />}>
          <AuthorsContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}
