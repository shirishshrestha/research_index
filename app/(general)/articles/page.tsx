import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticlesListView } from "@/features/general/articles";
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
          <ArticlesListView />
        </Suspense>
      </Container>
    </section>
  );
}
