import { Container, Icon } from "@/components/shared";
import { Card } from "@/components/ui/card";

const content = [
  {
    title: "Our Mission",
    icon: "mission",
    description:
      "To empower researchers, editors, and institutions by ensuring that scholarly output from Nepal is not only visible, accessible, and impactful—but also openly available. We strive to promote knowledge sharing that drives progress in science, society, and innovation.",
  },
  {
    title: "Our Vision",
    icon: "vision",
    description:
      "A world where Nepali research is recognized globally, contributing to solutions for local and international challenges through open access and trusted dissemination. We envision a future where verified data, insights, and metrics are freely discoverable by the global academic community.",
  },
];

export function MissionVisionSection() {
  return (
    <section className="section-padding  pt-12.5!">
      <Container>
        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col items-start gap-5.75 p-6.25 rounded-lg bg-blue-02 shadow-none border-none"
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="heading-3 text-primary!">{item.title}</h3>
                {/* Icon */}
                <Icon name={item.icon} size={42} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="heading-para">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
