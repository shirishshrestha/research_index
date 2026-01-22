import { Metadata } from "next";
import { JournalDetails } from "@/features/general/journals/components";
import { Container, PageHeroSection } from "@/components/shared";
import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { notFound } from "next/navigation";
import { getPublicJournal } from "@/features/general/journals/api/journals.server";

async function getJournal(id: string) {
  try {
    return await getPublicJournal(id);
  } catch (error) {
    console.error("Error fetching journal:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const journal = await getJournal(id);

  if (!journal) {
    return {
      title: "Journal Not Found - Resource Index",
    };
  }

  return {
    title: `${journal.title} - Resource Index`,
    description: journal.description || `View details for ${journal.title}`,
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const journal = await getJournal(id);

  if (!journal) {
    notFound();
  }

  return (
    <Container>
      <Breadcrumb
        items={[
          commonBreadcrumbs.home,
          commonBreadcrumbs.libraries,
          commonBreadcrumbs.journals,
          { label: journal.title },
        ]}
      />
      <JournalDetails journal={journal} />
    </Container>
  );
}
