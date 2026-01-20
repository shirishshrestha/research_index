import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { InstitutionsListView } from "@/features/general/institutions";
import { Metadata } from "next";
import { Suspense } from "react";
import { getPublicInstitutions } from "@/features/general/institutions/api/institutions.server";

export const metadata: Metadata = {
  title: "Institutions - Resource Index",
  description: "Browse academic institutions",
};

async function getInstitutions() {
  try {
    return await getPublicInstitutions();
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
}

export default async function InstitutionsPage() {
  const institutions = await getInstitutions();

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
        <Suspense fallback={<div>Loading...</div>}>
          <InstitutionsListView initialData={institutions} />
        </Suspense>
      </Container>
    </section>
  );
}
