import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticlesListView } from "@/features/general/articles";
import { getPublicPublications } from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export const metadata: Metadata = {
  title: "Articles - Resource Index",
  description: "Browse research articles",
};

export default function ArticlesPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            { label: "Research", href: "#" },
            commonBreadcrumbs.articles,
          ]}
        />
      </Container>

      <PageHeroSection
        heading="Explore Research Articles"
        para="Discover cutting-edge research from Nepal and beyond. Browse through peer-reviewed articles, publications, and scholarly works across diverse academic disciplines. Access open research and contribute to the global knowledge ecosystem."
      />

      <Container>
        <Suspense fallback={<FullScreenLoader />}>
          <ArticlesContent />
        </Suspense>
      </Container>
    </section>
  );
}

/**
 * Server Component that fetches articles data
 * Uses Next.js fetch() with cache tag "public-publications"
 * Automatically refetches when cache is revalidated
 */
async function ArticlesContent() {
  try {
    const publications = await getPublicPublications();
    return <ArticlesListView initialPublications={publications} />;
  } catch (error) {
    console.error("Failed to fetch publications:", error);
    return (
      <div className="text-center py-20">
        <p className="text-text-gray text-lg">
          Unable to load articles. Please try again later.
        </p>
      </div>
    );
  }
}
