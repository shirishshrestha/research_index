import { Container, Icon } from "@/components/shared";
import { Card } from "@/components/ui/card";

const values = [
  {
    title: "Transparency",
    description: "We ensure clear, reliable, and authentic academic data.",
    icon: "clarity",
  },
  {
    title: "Collaboration",
    description: "We work with institutions, publishers, and global partners.",
    icon: "united",
  },
  {
    title: "Innovation",
    description:
      "Using digital tools to improve research visibility and engagement.",
    icon: "gear",
  },
  {
    title: "Integrity",
    description: "Upholding the highest standards of scholarly communication.",
    icon: "deal",
  },
  {
    title: "Sustainability",
    description:
      "Promoting sustainable growth and responsible research practices.",
    icon: "impact",
  },
  {
    title: "Accessibility",
    description: "Knowledge should be open and available to everyone.",
    icon: "access-control",
  },
];

export function ValuesSection() {
  return (
    <section className="section-padding pt-0! ">
      <Container>
        {/* Section Header */}
        <div className="mb-12 mx-auto ">
          <p className="subheading">Our Values</p>
          <h2 className="heading-2 heading-gradient mb-5">
            Values grounded in <br /> transparency, collaboration, and
            integrity.
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="flex flex-col items-start gap-4 p-6.25 rounded-lg group bg-white shadow-none border hover:shadow-md group transition-shadow"
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="heading-3 text-text-black group-hover:text-primary group-hover:underline transition-all">
                  {value.title}
                </h3>
                {/* Icon */}
                <Icon name={value.icon} size={42} />
              </div>

              {/* Content */}
              <p className="para text-text-gray">{value.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
