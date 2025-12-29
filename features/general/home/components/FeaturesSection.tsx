import { Container } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared";

const features = [
  {
    title: "Global Search & Discovery",
    description:
      "Global research search engine with fast filters, smart auto complete, and smooth navigation across authors, journals, institutions.",
    icon: "world",
  },
  {
    title: "Author & Journal Profiles",
    description:
      "Verified academic identities with ORCID, ROR, DOAJ badges ensure authentic author, journal profiles and scholarly recognition.",
    icon: "curriculum",
  },
  {
    title: "Citation & Impact Metrics",
    description:
      "Smarter research with transparent metrics—h-Index, citations, impact, Article Rank—delivering normalized, contextual insights for decisions.",
    icon: "discussion",
  },
  {
    title: "Interactive Analytics & Visualization",
    description:
      "Interactive co-author networks, citation graphs, and dashboards turn complex data into actionable visual insights for discovery.",
    icon: "hand",
  },
  {
    title: "Workflow & Export Tools",
    description:
      "Streamlined research management with exports, reports, and alerts—integrated into workflows for sharing, productivity, and impact.",
    icon: "data",
  },
  {
    title: "Accessibility & Compliance",
    description:
      "Inclusive, barrier-free knowledge with WCAG-compliant design, transparent data, and responsive access across devices and user needs.",
    icon: "access-control",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className=" mb-12 text-start mx-auto">
          <p className="subheading ">Our Solutions</p>
          <h2 className="heading-2 heading-gradient mb-5">
            Solutions built on <br /> trust, data, and expertise.
          </h2>
          <p className="heading-para max-w-3xl">
            Our platform integrates enriched datasets, predictive analytics, and
            workflow software with human insight – delivering clarity,
            confidence, and transformation.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-start gap-5 p-6 rounded-lg bg-white shadow-none border-none hover:shadow-md group transition-shadow"
            >
              <div className=" flex items-center justify-between w-full">
                <h3 className="heading-3 group-hover:underline text-text-black max-w-[70%]">
                  {feature.title}
                </h3>
                {/* Icon */}
                <Icon name={feature.icon} size={42} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="para">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
