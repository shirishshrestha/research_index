import { Metadata } from "next";
import { JournalDetails } from "@/features/general/journals/components";
import { Container, PageHeroSection } from "@/components/shared";
import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Journal ${id} - Resource Index`,
    description: `View details for journal ${id}`,
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Container>
      <Breadcrumb
        items={[
          commonBreadcrumbs.home,
          commonBreadcrumbs.libraries,
          commonBreadcrumbs.journals,
          { label: "Journal Details" },
        ]}
      />
      <JournalDetails />
    </Container>
  );
}
