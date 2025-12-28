import { Container } from "@/components/shared";

export function AboutPlatformSection() {
  return (
    <section className="section-padding bg-gradient-blue relative overflow-hidden">
      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Section Header */}
          <p className="text-white/90 text-sm md:text-base font-medium">
            About the Platform
          </p>

          <h2 className="heading-2">
            Empowering Research Through Intelligence
          </h2>

          <div className="space-y-4 text-white/90">
            <p className="text-base md:text-lg leading-relaxed">
              Our directory is a comprehensive index of authors, journals, and
              research articles from around the world, designed to improve
              visibility, credibility, and accessibility of scholarly work.
              Built on transparency and trust, it provides enriched profiles,
              reliable metrics, and smart search tools to help researchers,
              editors, and institutions connect with knowledge that matters.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              The platform is committed to remaining open, accessible, and
              inclusive, ensuring that verified data, insights, and metrics are
              freely discoverable by the global academic community.
            </p>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-lg transform -rotate-6"></div>
        </div>
      </Container>
    </section>
  );
}
