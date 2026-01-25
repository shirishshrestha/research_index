import { Metadata } from "next";
import { Breadcrumb, Container } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { AuthorDetails } from "@/features/general/authors";
import { getPublicAuthor } from "@/features/general/authors/api/authors.server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

async function getAuthor(id: string) {
  try {
    return await getPublicAuthor(id);
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthor(id);

  if (!author) {
    return {
      title: "Author Not Found - Resource Index",
    };
  }

  return {
    title: `${author.title} ${author.full_name} - Resource Index`,
    description: author.bio || `View profile for ${author.full_name}`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = await getAuthor(id);

  if (!author) {
    notFound();
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.contributors,
            commonBreadcrumbs.authors,
            { label: author.full_name },
          ]}
        />
      </Container>

      <Container>
        <Suspense fallback={<FullScreenLoader />}>
          <AuthorDetails author={author} />
        </Suspense>
      </Container>
    </section>
  );
}
