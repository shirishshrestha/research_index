import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { IssuesListView } from "@/features/general/issues";
import { getPublicIssues } from "@/features/general/issues/api/issues.server";
import { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Issues - Resource Index",
  description: "Browse published journal issues",
};

interface IssuesPageProps {
  searchParams: Promise<{
    page?: string;
    page_size?: string;
    journal?: string;
    year?: string;
    is_special_issue?: string;
    search?: string;
  }>;
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const params = await searchParams;

  let issuesData;
  try {
    issuesData = await getPublicIssues(
      {
        journal: params.journal ? parseInt(params.journal) : undefined,
        year: params.year ? parseInt(params.year) : undefined,
        is_special_issue:
          params.is_special_issue === "true"
            ? true
            : params.is_special_issue === "false"
              ? false
              : undefined,
        search: params.search,
        status: "published",
        sort: "-publication_date",
      },
      {
        page: params.page ? parseInt(params.page) : 1,
        page_size: params.page_size ? parseInt(params.page_size) : 12,
      },
    );
  } catch (error) {
    console.error("Error fetching issues:", error);
    issuesData = { results: [], count: 0, next: null, previous: null };
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            { label: "Issues", href: "/issues" },
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Published Journal Issues"
        para="Browse the latest published issues from academic journals featured on the Nepal Research Indexing Platform. Discover a comprehensive collection of special issues, regular volumes, and cutting-edge research across diverse disciplines."
      />

      <Container>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
              <aside className="space-y-6">
                <Skeleton className="h-96 w-full" />
              </aside>
              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-80 w-full" />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <IssuesListView initialData={issuesData} />
        </Suspense>
      </Container>
    </section>
  );
}
