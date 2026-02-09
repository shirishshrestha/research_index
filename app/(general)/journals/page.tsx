import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  JournalsListView,
  JournalsListSkeleton,
} from "@/features/general/journals";
import { Metadata } from "next";
import { Suspense } from "react";
import { getPublicJournals } from "@/features/general/journals/api/journals.server";

export const metadata: Metadata = {
  title: "Journals - Resource Index",
  description: "Browse academic journals",
};

interface JournalsPageProps {
  searchParams: {
    access_type?: string;
    category?: string;
    language?: string;
    license?: string;
    years?: string;
    institutions?: string;
    country?: string;
    peer_review?: string;
    impact_factor?: string;
    cite_score?: string;
    time_to_decision?: string;
    time_to_acceptance?: string;
    search?: string;
    sort?: string;
  };
}

async function getJournals(searchParamsPromise: JournalsPageProps["searchParams"]) {
  // `searchParams` can be a Promise in some Next.js runtimes — unwrap it safely.
  const searchParams = await Promise.resolve(searchParamsPromise as any);
  try {
    return await getPublicJournals({
      access_type: searchParams?.access_type,
      category: searchParams?.category,
      language: searchParams?.language,
      license: searchParams?.license,
      years: searchParams?.years,
      institutions: searchParams?.institutions,
      country: searchParams?.country,
      peer_review: searchParams?.peer_review,
      impact_factor: searchParams?.impact_factor,
      cite_score: searchParams?.cite_score,
      time_to_decision: searchParams?.time_to_decision,
      time_to_acceptance: searchParams?.time_to_acceptance,
      search: searchParams?.search,
      sort: searchParams?.sort,
    });
  } catch (error) {
    console.error("Error fetching journals:", error);
    return [];
  }
}

export default async function JournalsPage({
  searchParams,
}: JournalsPageProps) {
  const journals = await getJournals(searchParams);

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
          <JournalsListView initialData={journals} />
        </Suspense>
      </Container>
    </section>
  );
}
