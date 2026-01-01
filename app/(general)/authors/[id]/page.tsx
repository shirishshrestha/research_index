import { Metadata } from "next";
import { Breadcrumb, Container } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { AuthorDetails } from "@/features/general/authors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Author ${id} - Resource Index`,
    description: `View profile for author ${id}`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section>
      <Container>
        <Breadcrumb
          items={[
            commonBreadcrumbs.home,
            commonBreadcrumbs.contributors,
            commonBreadcrumbs.authors,
            { label: `Author Details` },
          ]}
        />
      </Container>

      <Container>
        <AuthorDetails />
      </Container>
    </section>
  );
}
