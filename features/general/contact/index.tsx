import { Breadcrumb, Container, PageHeroSection } from "@/components/shared";
import { commonBreadcrumbs } from "@/components/shared/Breadcrumb";
import { ContactForm } from "./components";
import { Card } from "@/components/ui/card";

export function ContactPage() {
  return (
    <section>
      <Container>
        <Breadcrumb
          items={[commonBreadcrumbs.home, commonBreadcrumbs.contact]}
        />
      </Container>

      <PageHeroSection
        heading="Connecting People, Bridging Research"
        para="The Nepal Research Indexing Platform welcomes collaboration and communication. Connect with us for research assistance, partnerships, or inquiries. We're dedicated to supporting researchers, journals, and institutions to enhance Nepal's growing academic and research community."
      />

      <Container>
        <div className="section-padding pt-12.5!">
          <h3 className="heading-3 mb-3 text-text-black">Contact Us</h3>
          <p className="heading-para mb-12.5">
            Get in touch with us for support, collaboration, and inquiries.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_530px] gap-8 lg:gap-12">
            {/* Left: Contact Form */}
            <Card className="p-0 shadow-none border-none bg-background">
              <ContactForm />
            </Card>

            {/* Right: Contact Information */}
            <div className="space-y-8.75">
              <Card className="p-6.25 bg-blue-02 shadow-none border-none sticky top-32">
                <h3 className="heading-4 text-text-black">For Enquiry</h3>
                <div className="space-y-3">
                  <div className="flex gap-1 items-center">
                    <p className="sub-body font-semibold! text-text-black!">
                      General Inquiries:
                    </p>
                    <a
                      href="mailto:info@nepalresearchindex.com"
                      className="sub-body text-primary! hover:underline underline-offset-2"
                    >
                      info@nepalresearchindex.com
                    </a>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="sub-body font-semibold! text-text-black! ">
                      Technical Support:
                    </p>
                    <a
                      href="mailto:tech@nepalresearchindex.com"
                      className="sub-body text-primary! hover:underline underline-offset-2"
                    >
                      tech@nepalresearchindex.com
                    </a>
                  </div>
                  <div className="flex gap-1 items-center ">
                    <p className="sub-body font-semibold! text-text-black! ">
                      Partnerships & Services:
                    </p>
                    <a
                      href="mailto:sales@nepalresearchindex.com"
                      className="sub-body text-primary! hover:underline underline-offset-2"
                    >
                      sales@nepalresearchindex.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
