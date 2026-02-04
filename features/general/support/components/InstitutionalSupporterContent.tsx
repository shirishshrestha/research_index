"use client";

import Image from "next/image";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";
import { useInstitutionalSupporterQuery } from "../hooks";
import { BACKEND_URL } from "@/utils/constants";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Pricing (2025 - 2027)", value: "pricing" },
  { label: "Why Support NRI", value: "whySupport" },
  { label: "Benefits for Institutional Supporters", value: "benefits" },
  { label: "Support Network", value: "network" },
  { label: "Current Sponsors & Partners", value: "sponsors" },
];

export function InstitutionalSupporterContent() {
  const { data, isLoading, error } = useInstitutionalSupporterQuery();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Failed to load support page content.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content */}
      <div className="space-y-8.75">
        {/* Overview */}
        <div className="space-y-3.75 scroll-mt-32" id="overview">
          <h3 className="heading-4 text-text-black">Overview</h3>
          <RichTextDisplay content={data.overview} />
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
        </div>

        {/* Benefits */}
        <div className="space-y-3.75 scroll-mt-32" id="benefits">
          <h3 className="heading-4 text-text-black">
            Benefits for Institutional Supporters
          </h3>
          <ul className="space-y-2 list-disc pl-6">
            {data.benefits.map((benefit) => (
              <li key={benefit.id} className="sub-body">
                {benefit.title} - {benefit.description}
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
        {data.sponsors.length > 0 && (
          <div className="space-y-3.75 scroll-mt-32" id="sponsors">
            <h3 className="heading-4 text-text-black">
              Current Sponsors & Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="flex items-center justify-center bg-white rounded-lg p-3.75"
                  style={{
                    boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="relative w-[110.5px] h-[110.5px]">
                    <Image
                      src={`${BACKEND_URL}${sponsor.logo_url}`}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
