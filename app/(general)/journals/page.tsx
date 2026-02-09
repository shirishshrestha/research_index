import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  JournalsListView,
  JournalsListSkeleton,
} from "@/features/general/journals";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  getPublicJournals,
  type JournalsResponse,
} from "@/features/general/journals/api/journals.server";

export const metadata: Metadata = {
  title: "Journals - Resource Index",
  description: "Browse academic journals",
};

interface JournalsPageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    institution?: string;
    institutions?: string;
    access_type?: string;
    open_access?: string;
    category?: string;
    language?: string;
    license?: string;
    years?: string;
    country?: string;
    peer_review?: string;
    peer_reviewed?: string;
    impact_factor?: string;
    cite_score?: string;
    time_to_decision?: string;
    time_to_acceptance?: string;
    search?: string;
    sort?: string;
  };
}

async function getJournals(
  searchParamsPromise:
    | JournalsPageProps["searchParams"]
    | Promise<JournalsPageProps["searchParams"]>,
): Promise<JournalsResponse> {
  const searchParams = await Promise.resolve(searchParamsPromise as any);
  try {
    return await getPublicJournals(
      {
        institution: searchParams?.institution,
        institutions: searchParams?.institutions,
        access_type: searchParams?.access_type,
        open_access:
          searchParams?.open_access === "true"
            ? true
            : searchParams?.open_access === "false"
              ? false
              : undefined,
        category: searchParams?.category,
        language: searchParams?.language,
        license: searchParams?.license,
        years: searchParams?.years,
        country: searchParams?.country,
        peer_review: searchParams?.peer_review,
        peer_reviewed:
          searchParams?.peer_reviewed === "true"
            ? true
            : searchParams?.peer_reviewed === "false"
              ? false
              : undefined,
        impact_factor: searchParams?.impact_factor,
        cite_score: searchParams?.cite_score,
        time_to_decision: searchParams?.time_to_decision,
        time_to_acceptance: searchParams?.time_to_acceptance,
        search: searchParams?.search,
        sort: searchParams?.sort,
      },
      {
        page: searchParams?.page ? parseInt(searchParams.page) : 1,
        page_size: searchParams?.page_size
          ? parseInt(searchParams.page_size)
          : 10,
      },
    );
  } catch (error) {
    console.error("Error fetching journals:", error);
    return { results: [], count: 0, next: null, previous: null };
  }
}

export default async function JournalsPage({
  searchParams,
}: JournalsPageProps) {
  const journalsData = await getJournals(searchParams);

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
        <Suspense fallback={<JournalsListSkeleton />}>
          <JournalsListView
            initialData={journalsData.results}
            pagination={journalsData}
          />
        </Suspense>
      </Container>
    </section>
  );
}
