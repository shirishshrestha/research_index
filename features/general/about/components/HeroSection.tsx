import { Container, PageHeroSection } from "@/components/shared";
import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";

export function HeroSection() {
  return (
    <>
      <Container>
        <Breadcrumb items={[commonBreadcrumbs.home, commonBreadcrumbs.about]} />
      </Container>

      <PageHeroSection
        heading="Advancing Research, Amplifying Knowledge"
        para="The Nepal Research Indexing Platform is dedicated to making scholarly research more visible, accessible, and impactful. By indexing journals, articles, and authors across disciplines we provide a trusted space where academic knowledge connects with global audiences."
      />
    </>
  );
}
