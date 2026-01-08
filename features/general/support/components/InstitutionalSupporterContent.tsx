"use client";

import Image from "next/image";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Pricing (2025 - 2027)", value: "pricing" },
  { label: "Why Support NRI", value: "whySupport" },
  { label: "Benefits for Institutional Supporters", value: "benefits" },
  { label: "Support Network", value: "network" },
  { label: "Current Sponsors & Partners", value: "sponsors" },
];

const pricingData = [
  {
    category: "Large institutions (universities, research councils)",
    npr: "200,000",
    usd: "1500",
    purpose: "Supports platform growth and infrastructure",
  },
  {
    category: "Medium institutions (colleges, research centers)",
    npr: "100,000",
    usd: "750",
    purpose: "Contributes to maintenance and data curation",
  },
  {
    category: "Small institutions (departments, NGOs)",
    npr: "50,000",
    usd: "375",
    purpose: "Helps support access and metadata services",
  },
  {
    category: "Institutions from remote or community-based regions",
    npr: "25,000",
    usd: "190",
    purpose: "Ensures inclusion and regional participation",
  },
];

const whySupportPoints = [
  {
    title: "Locally led, nationally impactful",
    description:
      "Your contribution strengthens Nepal's capacity for digital research visibility and independence.",
  },
  {
    title: "Promotes open access",
    description:
      "Supporting NRI ensures that Nepali research outputs are discoverable globally without paywalls or barriers.",
  },
  {
    title: "Encourages best practices",
    description:
      "NRI promotes transparent publishing and metadata standards that enhance the credibility of Nepali journals and researchers.",
  },
  {
    title: "Sustains growth and quality",
    description:
      "As submissions and collaborations grow, your support helps us maintain quality and expand digital tools.",
  },
  {
    title: "Builds global connections",
    description:
      "By joining NRI, your institution becomes part of a larger movement linking Nepali research to the international academic community.",
  },
  {
    title: "Empowers policy and decision-making",
    description:
      "NRI data enables informed academic planning and supports evidence-based development in Nepal.",
  },
];

const benefitsPoints = [
  "Your institution will be acknowledged in NRI publications, reports, and outreach materials.",
  "You can highlight your supporter status on your institutional website and communications.",
  "Gain access to enhanced metadata integration via our API or research data sharing tools.",
  "Participate in capacity-building workshops, training sessions, and collaborative initiatives hosted by NRI.",
  "Be recognized as a key contributor to strengthening open research visibility and accessibility in Nepal.",
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

export function InstitutionalSupporterContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content */}
      <div className="space-y-8.75">
        {/* Overview */}
        <div className="space-y-3.75 scroll-mt-32" id="overview">
          <h3 className="heading-4 text-text-black">Overview</h3>
          <p className="sub-body">
            Academic and research institutions can become Nepal Research Index
            (NRI) supporters. Their support enables us to build an open and
            sustainable research ecosystem that connects authors, journals, and
            institutions across Nepal and beyond. We deeply value the
            contributions of our partner institutions to our shared vision of
            accessible and discoverable Nepali research.
          </p>
        </div>

        {/* Pricing */}
        <div className="space-y-3.75 scroll-mt-32" id="pricing">
          <h3 className="heading-4 text-text-black">Pricing (2025 - 2027)</h3>
          <p className="sub-body mb-6">
            To strengthen transparency and long-term sustainability, we have
            developed a tiered supporter model for institutions in Nepal. This
            model allows us to maintain the platform, improve infrastructure,
            and expand access to national and international audiences.
          </p>

          {/* Pricing Table */}
          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-text-black">
                    Category
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text-black">
                    NPR (Rs)
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text-black">
                    USD ($)
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text-black">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricingData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 text-sm text-text-black">
                      {row.category}
                    </td>
                    <td className="p-4 text-sm ">{row.npr}</td>
                    <td className="p-4 text-sm ">{row.usd}</td>
                    <td className="p-4 text-sm ">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm ">
              Institutions joining through a consortium or network may receive
              up to a <strong className="text-blue-900">20% discount</strong>.
              For customized partnership options or additional funding
              opportunities, please{" "}
              <a
                href="/contact"
                className="text-primary-600 hover:underline font-medium"
              >
                Contact Us
              </a>
              .
            </p>
          </div>
        </div>

        {/* Why Support NRI */}
        <div className="space-y-3.75 scroll-mt-32" id="whySupport">
          <h3 className="heading-4 text-text-black">
            Why You Should Support NRI
          </h3>
          <div className="space-y-4">
            {whySupportPoints.map((point, index) => (
              <div key={index} className="flex gap-3">
                <div className="shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-xs">
                      ✓
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {point.title}:
                  </h4>
                  <p className="sub-body">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3.75 scroll-mt-32" id="benefits">
          <h3 className="heading-4 text-text-black">
            Benefits for Institutional Supporters
          </h3>
          <ul className="space-y-2 list-disc pl-6">
            {benefitsPoints.map((benefit, index) => (
              <li key={index} className="sub-body">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        {/* Join Network */}
        <div className="space-y-3.75 scroll-mt-32" id="network">
          <h3 className="heading-4 text-text-black">
            Join the NRI Support Network
          </h3>
          <p className="sub-body mb-1">
            Becoming an NRI institutional supporter means investing in the
            growth of Nepal&apos;s open research landscape. Together, we can
            ensure that Nepali knowledge is visible, valued, and connected to
            the world.
          </p>
          <p className="sub-body ">
            Become an{" "}
            <a
              href="/support/register/institutional"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Institutional Supporter
            </a>
          </p>
        </div>

        {/* Current Sponsors & Partners */}
        <div className="space-y-3.75 scroll-mt-32" id="sponsors">
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
