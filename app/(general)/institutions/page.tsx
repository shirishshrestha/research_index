import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  InstitutionsListView,
  InstitutionsListSkeleton,
} from "@/features/general/institutions";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  getPublicInstitutions,
  type InstitutionsResponse,
} from "@/features/general/institutions/api/institutions.server";

export const metadata: Metadata = {
  title: "Institutions - Resource Index",
  description: "Browse academic institutions",
};

interface InstitutionsPageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    country?: string;
    type?: string;
    city?: string;
    state?: string;
    established_year?: string;
    established_from?: string;
    established_to?: string;
    research_area?: string;
    min_researchers?: string;
    min_publications?: string;
    min_citations?: string;
    has_website?: string;
    search?: string;
  };
}

async function getInstitutions(
  searchParams:
    | InstitutionsPageProps["searchParams"]
    | Promise<InstitutionsPageProps["searchParams"]>,
): Promise<InstitutionsResponse> {
  const params = await searchParams;
  try {
    return await getPublicInstitutions(
      {
        country: params?.country,
        type: params?.type,
        city: params?.city,
        state: params?.state,
        established_year: params?.established_year
          ? parseInt(params.established_year)
          : undefined,
        established_from: params?.established_from
          ? parseInt(params.established_from)
          : undefined,
        established_to: params?.established_to
          ? parseInt(params.established_to)
          : undefined,
        research_area: params?.research_area,
        min_researchers: params?.min_researchers
          ? parseInt(params.min_researchers)
          : undefined,
        min_publications: params?.min_publications
          ? parseInt(params.min_publications)
          : undefined,
        min_citations: params?.min_citations
          ? parseInt(params.min_citations)
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
    console.error("Error fetching institutions:", error);
    return { results: [], count: 0, next: null, previous: null };
  }
}

export default async function InstitutionsPage({
  searchParams,
}: InstitutionsPageProps) {
  const institutionsData = await getInstitutions(searchParams);

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.contributors,
            commonBreadcrumbs.institutions,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Connecting Institutions, Advancing Knowledge"
        para="The Nepal Research Indexing Platform features leading institutions shaping the nation's research landscape. Explore universities and organizations fostering innovation, collaboration, and academic excellence across Nepal's diverse fields of study."
      />

      <Container>
        <Suspense fallback={<InstitutionsListSkeleton />}>
          <InstitutionsListView
            initialData={institutionsData.results}
            pagination={institutionsData}
          />
        </Suspense>
      </Container>
    </section>
  );
}
