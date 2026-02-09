import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  InstitutionsListView,
  InstitutionsListSkeleton,
} from "@/features/general/institutions";
import { Metadata } from "next";
import { Suspense } from "react";
import { getPublicInstitutions } from "@/features/general/institutions/api/institutions.server";

export const metadata: Metadata = {
  title: "Institutions - Resource Index",
  description: "Browse academic institutions",
};

interface InstitutionsPageProps {
  searchParams: {
    country?: string;
    type?: string;
    search?: string;
  };
}

async function getInstitutions(
  searchParams:
    | InstitutionsPageProps["searchParams"]
    | Promise<InstitutionsPageProps["searchParams"]>,
) {
  const params = await searchParams;
  try {
    return await getPublicInstitutions({
      country: params?.country,
      type: params?.type,
      search: params?.search,
    });
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
}

export default async function InstitutionsPage({
  searchParams,
}: InstitutionsPageProps) {
  const institutions = await getInstitutions(searchParams);

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
          <InstitutionsListView initialData={institutions} />
        </Suspense>
      </Container>
    </section>
  );
}
