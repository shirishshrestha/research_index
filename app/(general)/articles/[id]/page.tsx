import { Breadcrumb, Container } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ArticleDetails } from "@/features/general/articles";
import { getPublicArticle } from "@/features/general/articles/api/articles.server";
import { Metadata } from "next";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await getPublicArticle(Number(id));
    return {
      title: `${article.title} - Resource Index`,
      description:
        article.abstract || `View details for article ${article.title}`,
    };
  } catch {
    return {
      title: `Article Details - Resource Index`,
      description: `View details for article ${id}`,
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getPublicArticle(Number(id));

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.libraries,
            commonBreadcrumbs.articles,
            { label: article.title, href: `/articles/${id}` },
          ]}
        />
      </Container>

      <Container>
        <Suspense fallback={<FullScreenLoader />}>
          <ArticleDetails article={article} />
        </Suspense>
      </Container>
    </section>
  );
}
