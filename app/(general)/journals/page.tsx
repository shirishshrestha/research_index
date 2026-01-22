import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { JournalsListView } from "@/features/general/journals";
import { Metadata } from "next";
import { Suspense } from "react";
import { getPublicJournals } from "@/features/general/journals/api/journals.server";

export const metadata: Metadata = {
  title: "Journals - Resource Index",
  description: "Browse academic journals",
};

async function getJournals() {
  try {
    return await getPublicJournals();
  } catch (error) {
    console.error("Error fetching journals:", error);
    return [];
  }
}

export default async function JournalsPage() {
  const journals = await getJournals();

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
        <Suspense fallback={<div>Loading...</div>}>
          <JournalsListView initialData={journals} />
        </Suspense>
      </Container>
    </section>
  );
}
