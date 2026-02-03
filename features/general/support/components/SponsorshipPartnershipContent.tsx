"use client";

import Image from "next/image";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";
import { useSponsorshipPartnershipQuery } from "../hooks";

const categories = [
  { label: "Overview", value: "overview" },
  { label: "Sponsorship Model", value: "sponsorship" },
  { label: "Partnership Model", value: "partnership" },
  { label: "Current Sponsors & Partners", value: "current" },
  { label: "Join as a Sponsor or Partner", value: "join" },
];

export function SponsorshipPartnershipContent() {
  const { data, isLoading, error } = useSponsorshipPartnershipQuery();

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

        {/* Sponsorship Model */}
        {data.sponsorship_detail && (
          <div className="space-y-3.75 scroll-mt-32" id="sponsorship">
            <h3 className="heading-4 text-text-black">Sponsorship Model</h3>
            <RichTextDisplay content={data.sponsorship_detail} />
          </div>
        )}

        {/* Partnership Model */}
        {data.partnership_detail && (
          <div className="space-y-3.75 scroll-mt-32" id="partnership">
            <h3 className="heading-4 text-text-black">Partnership Model</h3>
            <RichTextDisplay content={data.partnership_detail} />
          </div>
        )}

        {/* Current Sponsors & Partners */}
        {data.sponsors.length > 0 && (
          <div className="space-y-3.75 scroll-mt-32" id="current">
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
                      src={sponsor.logo_url || sponsor.logo || ""}
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

        {/* Join - can be part of partnership_detail or a separate section if needed */}
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
