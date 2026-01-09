"use client";

import Image from "next/image";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Sponsorship Model", value: "sponsorship" },
  { label: "Partnership Model", value: "partnership" },
  { label: "Current Sponsors & Partners", value: "current" },
  { label: "Join as a Sponsor or Partner", value: "join" },
];

const sponsorshipPoints = [
  "Building open research data tools and digital repositories",
  "Developing regional or language-based indexing zones",
  "Supporting author and institutional training programs",
  "Co-funding national academic publications, conferences, and open access tools that benefit the Nepali research community",
];

const partnershipPoints = [
  "Data collaboration and metadata sharing initiatives",
  "Research visibility and dissemination projects",
  "Capacity building through workshops and knowledge exchange",
  "Policy and advocacy cooperation for open access and transparent indexing standards",
];

const sponsors = [
  {
    name: "Nepal Medical College",
    logo: "/nepal-medical-college.png",
  },
  {
    name: "Nepal Medical Association",
    logo: "/nepal-medical-association.png",
  },
  {
    name: "Kathmandu University",
    logo: "/ku.png",
  },
  {
    name: "Tribhuvan University",
    logo: "/tu.png",
  },
  {
    name: "Pokhara University",
    logo: "/pou.png",
  },
  {
    name: "Purbanchal University",
    logo: "/pu.png",
  },
];

export function SponsorshipPartnershipContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content */}
      <div className="space-y-8.75">
        {/* Overview */}
        <div className="space-y-3.75 scroll-mt-32" id="overview">
          <h3 className="heading-4 text-text-black">Overview</h3>
          <p className="sub-body">
            In addition to authors, institutions, and partners, the Nepal
            Research Index (NRI) also welcomes organizations and agencies to
            become sponsors, contributing to the long-term sustainability of our
            research and knowledge visibility.
          </p>
        </div>

        {/* Sponsorship Model */}
        <div className="space-y-3.75 scroll-mt-32" id="sponsorship">
          <h3 className="heading-4 text-text-black">Sponsorship Model</h3>
          <p className="sub-body mb-4">
            Our sponsors extend sponsorship contribution of NPR 50,000
            (approximately USD 1,800). Sponsors may also collaborate with us at
            customizable levels through annual or multi-year contributions.
            Sponsorship agreements are flexible and designed to meet shared
            objectives between NRI and the sponsoring organization.
          </p>
          <p className="sub-body mb-4">
            Each sponsorship agreement is flexible and designed to meet shared
            objectives between NRI and the sponsoring organization.
          </p>
          <ul className="space-y-2 list-disc pl-6">
            {sponsorshipPoints.map((point, index) => (
              <li key={index} className="sub-body">
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Partnership Model */}
        <div className="space-y-3.75 scroll-mt-32" id="partnership">
          <h3 className="heading-4 text-text-black">Partnership Model</h3>
          <p className="sub-body mb-4">
            We actively seek partnerships with universities, government bodies,
            and international organizations for mutual support. Partner
            institutions and organizations collaborate with us to promote
            research transparency, improve metadata integration, and enhance
            visibility for Nepali scholarship. Partnerships may include:
          </p>
          <ul className="space-y-2 list-disc pl-6">
            {partnershipPoints.map((point, index) => (
              <li key={index} className="sub-body">
                {point}
              </li>
            ))}
          </ul>
          <p className="sub-body mt-4">
            We welcome collaboration proposals from universities, government
            bodies, research councils, and development partners committed to
            advancing open research in Nepal.
          </p>
        </div>

        {/* Current Sponsors & Partners */}
        <div className="space-y-3.75 scroll-mt-32" id="current">
          <h3 className="heading-4 text-text-black">
            Current Sponsors & Partners
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-white rounded-lg p-3.75"
                style={{
                  boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="relative w-[110.5px] h-[110.5px]">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join */}
        <div className="space-y-3.75 scroll-mt-32" id="join">
          <h3 className="heading-4 text-text-black">
            Join as a Sponsor or Partner
          </h3>
          <p className="sub-body mb-1">
            If your organization shares our vision of promoting accessible,
            high-quality, and globally visible Nepali research, we invite you to
            connect with us.
          </p>
          <p className="sub-body">
            Become an
            <a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Sponsor or Partner
            </a>
          </p>
        </div>
      </div>

      {/* Sticky Sidebar Navigation */}
      <aside>
        <div className="flex flex-col gap-1.25 sticky top-32">
          {categories.map((category) => (
            <a
              key={category.value}
              href={`#${category.value}`}
              className="w-full text-left p-2.5 rounded-md transition-all border border-white-02 bg-white hover:bg-gray-50"
            >
              <span className="text-base text-text-black">
                {category.label}
              </span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
