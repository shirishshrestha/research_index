import { Container } from "@/components/shared";
import { Breadcrumb, commonBreadcrumbs } from "@/components/shared/Breadcrumb";

export function AboutPage() {
  return (
    <>
      <div className="py-6">
        <Container>
          <Breadcrumb
            variant="default"
            items={[commonBreadcrumbs.home, commonBreadcrumbs.about]}
          />
        </Container>
      </div>

      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-2 heading-gradient mb-6">
              About Resource Index
            </h1>
            <div className="space-y-4 text-lg" style={{ color: "#555" }}>
              <p>
                Resource Index is a comprehensive platform designed to help
                researchers, students, and professionals discover and organize
                research materials efficiently.
              </p>
              <p>
                Our mission is to make research resources more accessible and
                organized, enabling better collaboration and knowledge sharing
                across academic and professional communities.
              </p>
              <h2 className="heading-3 mt-8 mb-4" style={{ color: "#023B8B" }}>
                Our Vision
              </h2>
              <p>
                We envision a world where quality research resources are easily
                discoverable and accessible to everyone, regardless of their
                location or institutional affiliation.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
