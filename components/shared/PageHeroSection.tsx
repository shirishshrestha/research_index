import { Container } from "@/components/shared";
import Image from "next/image";

interface PageHeroSectionProps {
  heading: string;
  para: string;
}

export function PageHeroSection({ heading, para }: PageHeroSectionProps) {
  return (
    <Container>
      <section className="bg-hero-gradient shadow-lg relative overflow-hidden p-8 lg:p-12.5 rounded-[10px]">
        <div className="flex items-center justify-between gap-8">
          {/* Content */}
          <div className="flex-1 max-w-3xl relative z-10">
            <h1 className="heading-2 max-[640px]:text-[32px]! sm:max-w-[90%] lg:max-w-[70%] text-white mb-4 leading-tight">
              {heading}
            </h1>
            <p className="text-white sm:max-w-[90%] lg:max-w-[70%] xl:max-w-full text-base leading-relaxed">
              {para}
            </p>
          </div>
          <Image
            width={500}
            height={500}
            src="/shape3.svg"
            alt="shapes"
            className="absolute right-12.5 w-auto hidden lg:inline pointer-events-none"
          />
        </div>
      </section>
    </Container>
  );
}
