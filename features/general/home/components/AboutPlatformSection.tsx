import { Container } from "@/components/shared";
import Image from "next/image";

export function AboutPlatformSection() {
  return (
    <Container>
      <section className="py-12.5 rounded-4xl bg-gradient-blue relative overflow-hidden">
        <Image
          width={500}
          height={400}
          src="/shape1.svg"
          alt="shapes"
          className="absolute hidden lg:inline left-12.5 top-0 h-auto w-auto pointer-events-none"
        />
        <Image
          width={500}
          height={400}
          src="/shape2.svg"
          alt="shapes"
          className="absolute hidden lg:inline right-12.5 top-0 h-auto w-auto pointer-events-none"
        />
        <div className="relative z-10 max-w-[80%] lg:max-w-4xl 2xl:max-w-5xl mx-auto text-center space-y-8.75">
          {/* Section Header */}
          <div className="space-y-3">
            <p className="subheading text-blue-02!">About the Platform</p>
            <h2 className="heading-2">
              Empowering Research Through <br /> Intelligence
            </h2>
          </div>

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
      </section>
    </Container>
  );
}
