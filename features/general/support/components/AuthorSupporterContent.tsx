"use client";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Pricing (2025 - 2027)", value: "pricing" },
  { label: "Why Support NRI", value: "whySupport" },
  { label: "Benefits for Author Supporters", value: "benefits" },
  { label: "Support Network", value: "network" },
];

const pricingData = [
  {
    category: "Senior Researcher / Professor",
    npr: "10,000",
    usd: "75",
    purpose: "Supports data maintenance and research discoverability",
  },
  {
    category: "Independent Researcher / Scholar",
    npr: "7,000",
    usd: "50",
    purpose: "Contributes to indexing and infrastructure growth",
  },
  {
    category: "Postgraduate Student",
    npr: "3500",
    usd: "25",
    purpose: "Assists with research visibility and student indexing",
  },
  {
    category: "Undergraduate Student",
    npr: "1500",
    usd: "10",
    purpose: "Encourages early-career participation in research indexing",
  },
];

const whySupportPoints = [
  {
    title: "Enhance research visibility",
    description:
      "Ensure your work is discoverable by national and international readers.",
  },
  {
    title: "Contribute to open access growth",
    description:
      "Support a system that makes Nepali scholarship freely accessible.",
  },
  {
    title: "Strengthen research integrity",
    description:
      "Help maintain a transparent and standardized platform for verified research.",
  },
  {
    title: "Build community connections",
    description:
      "Join a growing network of authors promoting responsible publication and collaboration.",
  },
  {
    title: "Invest in the future of Nepali academia",
    description:
      "Your support sustains a national research repository built on inclusion and accessibility.",
  },
];

const benefitsPoints = [
  "A verified supporter badge displayed on their NRI author profile.",
  "Priority access to metadata updates and research indexing.",
  "Eligibility for training, workshops, and digital publication support offered by NRI.",
  "Recognition in NRI's annual report and newsletters.",
  "Early insights into new tools, metrics, and author resources being developed.",
];

export function AuthorSupporterContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content */}
      <div className="space-y-8.75">
        {/* Overview */}
        <div className="space-y-3.75 scroll-mt-32" id="overview">
          <h3 className="heading-4 text-text-black">Overview</h3>
          <p className="sub-body">
            The Nepal Research Index thrives through the active participation of
            authors who believe in accessible, transparent, and globally visible
            research. Our Author Supporter Model allows individual researchers
            and writers to contribute to maintaining and expanding the national
            research infrastructure.
          </p>
          <p className="sub-body">
            Your support helps us improve metadata quality, enhance journal
            visibility, and ensure that Nepali research outputs are indexed and
            accessible worldwide.
          </p>
        </div>

        {/* Pricing */}
        <div className="space-y-3.75 scroll-mt-32" id="pricing">
          <h3 className="heading-4 text-text-black">Pricing (2025 - 2027)</h3>
          <p className="sub-body mb-6">
            NRI has introduced a simplified contribution model for authors,
            designed to remain affordable while sustaining long-term growth and
            technical development.
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
                    <td className="p-4 text-sm text-text-gray">{row.npr}</td>
                    <td className="p-4 text-sm text-text-gray">{row.usd}</td>
                    <td className="p-4 text-sm text-text-gray">
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              Authors can also choose to contribute voluntarily at higher levels
              or through institutional memberships.
            </p>
          </div>
        </div>

        {/* Why Support NRI as an Author */}
        <div className="space-y-3.75 scroll-mt-32" id="whySupport">
          <h3 className="heading-4 text-text-black">
            Why Support NRI as an Author
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
            Benefits for Authors Supporters
          </h3>
          <ul className="space-y-2  list-disc pl-6">
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

          <p className="sub-body">
            Become an{" "}
            <a
              href="/support/register/author"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Author Supporter
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
