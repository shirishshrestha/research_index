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
    institution?: string;
    open_access?: string;
    peer_reviewed?: string;
    search?: string;
  };
}

async function getJournals(searchParams: JournalsPageProps["searchParams"]) {
  try {
    return await getPublicJournals({
      institution: searchParams.institution,
      open_access:
        searchParams.open_access === "true"
          ? true
          : searchParams.open_access === "false"
            ? false
            : undefined,
      peer_reviewed:
        searchParams.peer_reviewed === "true"
          ? true
          : searchParams.peer_reviewed === "false"
            ? false
            : undefined,
      search: searchParams.search,
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
