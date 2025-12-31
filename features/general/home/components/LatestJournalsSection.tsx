import { Container, Icon } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const journals = [
  {
    title: "Journal of Himalayan",
    issn: "2789-4536",
    doiPrefix: "10.58291",
    license: "CC BY-NC-SA 4.0",
    image: "/journal-placeholder.png",
  },
  {
    title: "Journal of Himalayan",
    issn: "2789-4536",
    doiPrefix: "10.58291",
    license: "CC BY-NC-SA 4.0",
    image: "/journal-placeholder.png",
  },
  {
    title: "Journal of Himalayan",
    issn: "2789-4536",
    doiPrefix: "10.58291",
    license: "CC BY-NC-SA 4.0",
    image: "/journal-placeholder.png",
  },
  {
    title: "Journal of Himalayan",
    issn: "2789-4536",
    doiPrefix: "10.58291",
    license: "CC BY-NC-SA 4.0",
    image: "/journal-placeholder.png",
  },
];

export function LatestJournalsSection() {
  return (
    <section className="section-padding">
      <Container>
        {/* Heading Section */}
        <div className="flex justify-between items-end mb-12">
          <div className="text-start">
            <p className="subheading">Recently Added</p>
            <h2 className="heading-2 heading-gradient mb-5">
              Latest Published Journals
            </h2>
            <p className="heading-para max-w-3xl">
              Stay up to date with the newest publications across diverse
              fields. Discover the latest journals with verified insights and
              metrics.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            asChild
          >
            <Link href="/journals">
              View All
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] items-center gap-8.5">
          {/* Left Content */}
          <article className="bg-blue-02 rounded-lg p-6.25 text-text-gray space-y-6 h-full flex flex-col justify-center">
            <p className="text-base leading-relaxed">
              The feasibility criteria for journals assess their sustainability,
              quality, and compliance with publishing standards. Factors such as
              editorial independence, peer-review integrity, publication
              frequency, and accessibility are key indicators of reliability.
            </p>
            <p className="text-base leading-relaxed">
              Additionally, journals must demonstrate consistent submission
              rates, qualified editorial boards, and transparent policies on
              ethics, copyright, and open-access to ensure long-term academic
              impact.
            </p>
            <p className="text-base leading-relaxed">
              Feasibility criteria assess a journal&apos;s quality,
              sustainability, and accessibility. Key factors include peer
              review, editorial integrity, financial stability, digital
              readiness, and ethical publishing standards for lasting academic
              impact.
            </p>
          </article>

          {/* Right Grid - Journal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journals.map((journal, index) => (
              <Card
                key={`${index} - ${journal.title}`}
                className="p-6.25 group border-0 border-b-transparent border-b-3  hover:border-b-primary justify-between rounded-md bg-white flex sm:flex-row shadow-none transition-all space-y-4"
              >
                {/* Card Header with External Link Icon */}
                <div className="flex flex-col justify-between h-full items-start">
                  <h3 className="heading-3 text-text-black flex-1 mb-1.25 truncate">
                    <Link href={"/journals"} className="group-hover:underline">
                      {journal.title}
                    </Link>
                  </h3>

                  {/* Journal Details */}
                  <div className="space-y-1 text-sm">
                    <p className="text-text-gray">
                      <span className="">ISSN:</span>{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {journal.issn}
                      </Link>
                    </p>
                    <p className="text-text-gray">
                      <span className="">DOI Prefix:</span>{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {journal.doiPrefix}
                      </Link>
                    </p>
                    <p className="text-text-gray">
                      <span className="">License:</span> {journal.license}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <Button
                    variant="outline"
                    className=" border-primary mt-2.75 text-sm px-4 py-1 text-primary"
                    size={"sm"}
                    type="button"
                  >
                    Follow
                  </Button>
                </div>

                <div className="flex flex-col justify-between items-end">
                  {/* Journal Image Placeholder */}
                  <Link href={"/journals"}>
                    <Icon name="link-external-02" size={24} />
                  </Link>
                  <Image
                    width={92}
                    height={123}
                    src={"/sample-journal.png"}
                    alt="journal-image"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
