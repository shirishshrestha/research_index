import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import {
  AuthorsListView,
  AuthorsListSkeleton,
} from "@/features/general/authors";
import { getPublicAuthors } from "@/features/general/authors/api/authors.server";
import type { Author } from "@/features/general/authors/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authors - Resource Index",
  description:
    "Explore our growing list of authors contributing to Nepal's research excellence across diverse disciplines.",
};

interface AuthorsPageProps {
  searchParams: {
    institute?: string;
    designation?: string;
    search?: string;
  };
}

async function getAuthors(searchParamsPromise: AuthorsPageProps["searchParams"]) {
  // `searchParams` can be a Promise in some Next.js runtimes — unwrap it safely.
  const searchParams = await Promise.resolve(searchParamsPromise as any);
  try {
    return await getPublicAuthors({
      institute: searchParams?.institute,
      designation: searchParams?.designation,
      search: searchParams?.search,
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
  const authors = await getAuthors(searchParams);
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Contributors", href: "#" },
            commonBreadcrumbs.authors,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Empowering Authors, Showcasing Knowledge"
        para="The Nepal Research Indexing Platform celebrates the scholars behind every discovery. Explore our growing list of authors contributing to Nepal's research excellence across diverse disciplines. Together, we strengthen visibility, foster collaboration, and advance global academic impact."
      />

      <Container>
        <Suspense fallback={<AuthorsListSkeleton />}>
          <AuthorsListView initialData={authors} />
        </Suspense>
      </Container>
    </section>
  );
}
