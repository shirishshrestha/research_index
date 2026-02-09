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

async function AuthorsContent({
  searchParams,
}: {
  searchParams:
    | AuthorsPageProps["searchParams"]
    | Promise<AuthorsPageProps["searchParams"]>;
}) {
  const params = await searchParams;
  let authors: Author[];
  try {
    authors = await getPublicAuthors({
      institute: params?.institute,
      designation: params?.designation,
      search: params?.search,
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    authors = [];
  }

  return <AuthorsListView initialData={authors} />;
}

export default function AuthorsPage({ searchParams }: AuthorsPageProps) {
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
          <AuthorsContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  );
}
