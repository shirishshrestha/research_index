import {
  HeroSection,
  FeaturesSection,
  AboutPlatformSection,
  LatestJournalsSection,
} from "./components";
import { getLatestJournals } from "../journals/api/journals.server";

export async function HomePage() {
  const journals = await getLatestJournals();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutPlatformSection />
      <LatestJournalsSection journals={journals} />
    </>
  );
}
