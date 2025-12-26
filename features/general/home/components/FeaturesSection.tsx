import { Container } from "@/components/shared";

export function FeaturesSection() {
  const features = [
    {
      title: "Comprehensive Resources",
      description: "Access a wide range of research materials and resources",
      icon: "📚",
    },
    {
      title: "Easy Search",
      description: "Find what you need quickly with our advanced search",
      icon: "🔍",
    },
    {
      title: "Organized Content",
      description: "Well-structured and categorized for easy navigation",
      icon: "📋",
    },
    {
      title: "Regular Updates",
      description: "Stay current with regularly updated content",
      icon: "🔄",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="heading-2 heading-gradient">Key Features</h2>
          <p className="subheading mt-4" style={{ color: "#555" }}>
            Everything you need for effective research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="heading-4 mb-2" style={{ color: "#023B8B" }}>
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: "#555" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
