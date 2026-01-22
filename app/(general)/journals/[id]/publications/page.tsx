import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticlesListView } from "@/features/general/articles";
import { getJournalPublications } from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";
import { notFound } from "next/navigation";
import { getPublicJournal } from "@/features/general/journals/api/journals.server";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
      title: "Publications Not Found - Resource Index",
    };
  }

  return {
    title: `${journal.title} - Publications - Resource Index`,
    description: `Browse publications in ${journal.title}`,
  };
}

export default async function JournalPublicationsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const journal = await getJournal(id);

  if (!journal) {
    notFound();
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            commonBreadcrumbs.journals,
            {
              label: journal.title,
              href: `/journals/${id}`,
            },
            {
              label: "Publications",
              href: `/journals/${id}/publications`,
            },
          ]}
        />
      </Container>

      <PageHeroSection
        heading={`${journal.title} - Publications`}
        para={
          journal.description ||
          `Browse all published articles and research papers in ${journal.title}`
        }
      />

      <Container>
        <Suspense fallback={<FullScreenLoader />}>
          <JournalPublicationsContent journalId={Number(id)} />
        </Suspense>
      </Container>
    </section>
  );
}

/**
 * Server Component that fetches journal publications
 * Uses Next.js fetch() with cache tag "journal-publications"
 */
async function JournalPublicationsContent({
  journalId,
}: {
  journalId: number;
}) {
  try {
    const publications = await getJournalPublications(journalId);
    return <ArticlesListView initialPublications={publications} />;
  } catch (error) {
    console.error("Failed to fetch journal publications:", error);
    return (
      <div className="text-center py-20">
        <p className="text-text-gray text-lg">
          Unable to load publications for this journal. Please try again later.
        </p>
      </div>
    );
  }
}
