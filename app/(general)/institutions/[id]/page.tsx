import { Metadata } from "next";
import { Breadcrumb, Container } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { InstitutionDetails } from "@/features/general/institutions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Institution ${id} - Resource Index`,
    description: `View details for institution ${id}`,
  };
}

export default async function InstitutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.contributors,
            commonBreadcrumbs.institutions,
            { label: `Institution Details` },
          ]}
        />
      </Container>

      <Container>
        <InstitutionDetails />
      </Container>
    </section>
  );
}
