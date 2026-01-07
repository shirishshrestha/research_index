import { Container, Icon } from "@/components/shared";

const services = [
  {
    title: "Research Indexing",
    description:
      "Curating and indexing research and articles across diverse disciplines.",
    icon: "market-research",
  },
  {
    title: "Insights & Impact",
    description:
      "Providing accurate citation data, usage metrics, and research analytics.",
    icon: "insight",
    hoverIcon: "insight-white",
  },
  {
    title: "Author & Journal Verification",
    description: "Ensuring authenticity through verified academic profiles.",
    icon: "training",
    hoverIcon: "training-white",
  },
  {
    title: "Open Access & Global Reach",
    description:
      "Promoting accessible research and expanding international visibility.",
    icon: "key",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="bg-blue-02 section-padding">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12.5">
          <aside className=" ">
            {/* Section Header */}
            <div className="sticky top-32 space-y-5">
              <p className="subheading ">What We Do</p>
              <div className="space-y-3">
                <h2 className="heading-2 heading-gradient">
                  Unifying researchers,
                  <br /> institutions, and innovation
                  <br /> under one open platform.
                </h2>
              </div>
              <div className="space-y-4">
                <p className="heading-para">
                  In today&apos;s digital era, research thrives when it is
                  discoverable and accessible. By connecting authors, journals,
                  and institutions through our platform, we ensure that academic
                  contributions from Nepal not only serve the nation but also
                  resonate worldwide.
                </p>
              </div>
            </div>
          </aside>
          {/* Services Grid */}
          <aside className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex flex-col gap-6.25">
              <div className="bg-gradient-blue p-6.25 rounded-md">
                <div className="space-y-2">
                  <Icon name={services[0].icon} size={36} />
                  <h3 className="heading-3 text-white mb-3">
                    {services[0].title}
                  </h3>
                </div>
                <p className="text-white/80 text-base">
                  {services[0].description}
                </p>
              </div>
              <div className="about__card group">
                <div className="space-y-2">
                  <span className="block group-hover:hidden">
                    <Icon name={services[2].icon} size={36} />
                  </span>
                  <span className="hidden group-hover:block">
                    <Icon name={services[2].hoverIcon ?? ""} size={36} />
                  </span>
                  <h3 className="heading-3 group-hover:text-white transition-all text-text-black mb-3">
                    {services[2].title}
                  </h3>
                </div>
                <p className="group-hover:text-white transition-all">
                  {services[2].description}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6.25 mt-7.5">
              <div className="about__card group">
                <div className="space-y-2">
                  <span className="block group-hover:hidden">
                    <Icon name={services[1].icon} size={36} />
                  </span>
                  <span className="hidden group-hover:block">
                    <Icon name={services[1].hoverIcon ?? ""} size={36} />
                  </span>
                  <h3 className="heading-3 group-hover:text-white transition-all text-text-black mb-3">
                    {services[1].title}
                  </h3>
                </div>
                <p className="group-hover:text-white transition-all">
                  {services[1].description}
                </p>
              </div>
              <div className="bg-gradient-blue p-6.25 rounded-md">
                <div className="space-y-2">
                  <Icon name={services[3].icon} size={36} />
                  <h3 className="heading-3 text-white mb-3">
                    {services[3].title}
                  </h3>
                </div>
                <p className="text-white/80 text-base">
                  {services[3].description}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
