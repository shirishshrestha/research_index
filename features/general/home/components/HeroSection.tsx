import { Container } from "@/components/shared";
import { Button } from "@/components/shared/Button";

export function HeroSection() {
  return (
    <section
      className="py-20 text-white"
      style={{
        background: "linear-gradient(180deg, #023B8B 25.96%, #012558 70.66%)",
      }}
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="heading-1">Welcome to Resource Index</h1>
          <p className="subheading text-white/90">
            Discover and explore a comprehensive collection of research
            resources
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button variant="secondary">Get Started</Button>
            <Button
              variant="primary"
              className="bg-white text-[#023B8B] hover:bg-gray-100"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
