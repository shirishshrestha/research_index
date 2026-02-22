import { Container, Icon } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Journal } from "@/features/general/journals/api/journals.server";
import { EllipsisTooltip } from "@/features/shared";

interface LatestJournalsSectionProps {
  journals: Journal[];
}

export function LatestJournalsSection({
  journals,
}: LatestJournalsSectionProps) {
  const displayJournals = journals.length > 0 ? journals : [];
  const isEmpty = displayJournals.length === 0;

  if (isEmpty) {
    return (
      <section className="section-padding">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div className="text-start">
              <p className="subheading">Recently Added</p>
              <h2 className="heading-2 heading-gradient mb-5">
                Latest Published Journals
              </h2>
              <p className="heading-para max-w-3xl">
                No journals have been published yet. Check back later or view all journals.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              asChild
            >
              <Link href="/journals">View All</Link>
            </Button>
          </div>

          <div className="p-6 rounded-md bg-white text-center text-text-gray">
            There are no journals to display.
          </div>
        </Container>
      </section>
    );
  }
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
            {journals.map((journal) => (
              <Card
                key={journal.id}
                className="gap-1 sm:gap-3 p-6.25 group hover:shadow-md justify-between rounded-md bg-white flex sm:flex-row
                transition-all space-y-4 "
              >
                {/* Card Header with External Link Icon */}
                <div className="flex w-full  flex-col gap-2 h-full items-start">
                  <Link
                    href={`/journals/${journal.id}`}
                    className="group-hover:underline heading-3"
                  >
                    <EllipsisTooltip
                      text={journal.title}
                      spanProps={{ className: "max-w-45" }}
                      maxLength={25}
                    />
                  </Link>

                  {/* Journal Details */}
                  <div className="space-y-1 text-sm">
                    <p className="text-text-gray">
                      <span className="">ISSN:</span>{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {journal.issn || "N/A"}
                      </Link>
                    </p>
                    <p className="text-text-gray">
                      <span className="">E-ISSN:</span>{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {journal.e_issn || "N/A"}
                      </Link>
                    </p>
                    <p className="text-text-gray">
                      <span className="">Publisher:</span>{" "}
                      {journal.publisher_name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col w-full justify-between sm:items-end">
                  {/* Journal Image Placeholder */}
                  <Link href={`/journals/${journal.id}`}>
                    <Icon name="link-external-02" size={24} />
                  </Link>
                  <Image
                    width={92}
                    height={123}
                    src={journal.cover_image_url || "/placeholder.png"}
                    alt={`${journal.title} cover`}
                    className="w-[80%] h-45 object-cover "
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
