import { ContactPage } from "@/features/general/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Resource Index",
  description: "Get in touch with us",
};

export default function Contact() {
  return <ContactPage />;
}
