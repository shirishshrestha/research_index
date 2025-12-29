import { AboutPage } from "@/features/general/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Resource Index",
  description: "Learn more about Resource Index and our mission",
};

export default function About() {
  return <AboutPage />;
}
