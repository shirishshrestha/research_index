import { Metadata } from "next";
import { Breadcrumb, Container } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { InstitutionDetails } from "@/features/general/institutions";
import { getPublicInstitution } from "@/features/general/institutions/api/institutions.server";
import { notFound } from "next/navigation";

async function getInstitution(id: string) {
  try {
    return await getPublicInstitution(id);
  } catch (error) {
    console.error("Error fetching institution:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const institution = await getInstitution(id);

  if (!institution) {
    return {
      title: "Institution Not Found - Resource Index",
    };
  }

  return {
    title: `${institution.institution_name} - Resource Index`,
    description:
      institution.description ||
      `View details for ${institution.institution_name}`,
  };
}

export default async function InstitutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const institution = await getInstitution(id);

  if (!institution) {
    notFound();
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.contributors,
            commonBreadcrumbs.institutions,
            { label: institution.institution_name },
          ]}
        />
      </Container>

      <Container>
        <InstitutionDetails institution={institution} />
      </Container>
    </section>
  );
}
