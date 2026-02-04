import Image from "next/image";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";
import type { SupportPage } from "../types";
import { BACKEND_URL } from "@/utils/constants";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Sponsorship Opportunities", value: "sponsorship" },
  { label: "Partnership Opportunities", value: "partnership" },
  { label: "Current Sponsors & Partners", value: "sponsors" },
];

interface SponsorshipPartnershipContentServerProps {
  data: SupportPage;
}

export function SponsorshipPartnershipContentServer({
  data,
}: SponsorshipPartnershipContentServerProps) {
  const activeSponsors =
    data.sponsors?.filter(
      (s) => s.is_active && s.show_on_sponsorship_partnership,
    ) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content */}
      <div className="space-y-8.75">
        {/* Overview */}
        <div className="space-y-3.75 scroll-mt-32" id="overview">
          <h3 className="heading-4 text-text-black">Overview</h3>
          <RichTextDisplay content={data.overview} />
        </div>

        {/* Sponsorship Opportunities */}
        <div className="space-y-3.75 scroll-mt-32" id="sponsorship">
          <h3 className="heading-4 text-text-black">
            Sponsorship Opportunities
          </h3>
          <p className="sub-body mb-6">
            Organizations and agencies can support NRI through financial
            sponsorships that help us maintain and expand our research
            infrastructure.
          </p>

          {data.pricing_tiers.length > 0 && (
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
                  {data.pricing_tiers.map((tier) => (
                    <tr key={tier.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm text-text-black">
                        {tier.category}
                      </td>
                      <td className="p-4 text-sm ">{tier.npr_amount}</td>
                      <td className="p-4 text-sm ">{tier.usd_amount}</td>
                      <td className="p-4 text-sm ">{tier.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Partnership Opportunities */}
        <div className="space-y-3.75 scroll-mt-32" id="partnership">
          <h3 className="heading-4 text-text-black">
            Partnership Opportunities
          </h3>
          <div className="space-y-4">
            {data.why_support_points.map((point) => (
              <div key={point.id} className="flex gap-3">
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

          {data.benefits.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Partnership Benefits:
              </h4>
              <ul className="space-y-2 list-disc pl-6">
                {data.benefits.map((benefit) => (
                  <li key={benefit.id} className="sub-body">
                    {benefit.title} - {benefit.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Current Sponsors */}
        {activeSponsors.length > 0 && (
          <div className="space-y-3.75 scroll-mt-32" id="sponsors">
            <h3 className="heading-4 text-text-black">
              Current Sponsors & Partners
            </h3>
            <p className="sub-body mb-4">
              We are grateful to our sponsors and partners who support our
              mission to promote Nepal&apos;s research visibility.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeSponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex flex-col items-center gap-3 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  {sponsor.logo_url && (
                    <div className="relative w-24 h-24">
                      <Image
                        src={`${BACKEND_URL}${sponsor.logo_url}`}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm font-medium text-center">
                    {sponsor.name}
                  </p>
                  {sponsor.website_url && (
                    <a
                      href={sponsor.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            Interested in Sponsoring or Partnering?
          </h4>
          <p className="sub-body mb-4">
            We would love to discuss how your organization can support Nepal
            Research Index.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Sticky Sidebar */}
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
