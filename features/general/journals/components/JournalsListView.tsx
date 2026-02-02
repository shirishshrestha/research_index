"use client";

import { Icon } from "@/components/shared";
import { FilterToolbar, Pagination } from "@/features/shared/components";
import { JournalCard } from "./JournalCard";
import type { Journal } from "../api/journals.server";
import {
  accessTypeOptions,
  categoryOptions,
  countryOptionsExtended,
  institutionOptions,
  languageOptions,
  licenseOptions,
  peerReviewOptions,
  sortOptionsExtended,
  yearOptions,
} from "@/features/shared/constants/filterOptions";
import { useState } from "react";

const mockJournals = [
  {
    id: "1",
    title: "Journal of Himalayan Environmental Studies",
    institution: "Nepal Academy of Science and Technology (NAST)",
    imageUrl: "/sample-journal.png",
    badge: { label: "ICV 2024", value: "171.50" },
    metrics: [
      { value: "1.2", label: "Impact factor" },
      { value: "2.8", label: "CiteScore" },
      { value: "54%", label: "Acceptance Rate" },
      { value: "45 days", label: "Submission to first decision" },
      { value: "7 days", label: "Time to acceptance" },
    ],
  },
  {
    id: "2",
    title: "Nepal Journal of Medical Sciences",
    institution: "Institute of Medicine",
    imageUrl: "/sample-journal.png",
    badge: { label: "IF 2024", value: "3.45" },
    metrics: [
      { value: "3.45", label: "Impact factor" },
      { value: "4.2", label: "CiteScore" },
      { value: "32%", label: "Acceptance Rate" },
      { value: "30 days", label: "Submission to first decision" },
      { value: "10 days", label: "Time to acceptance" },
    ],
  },
  {
    id: "3",
    title: "Himalayan Biodiversity",
    institution: "Tribhuvan University",
    imageUrl: "/sample-journal.png",
    badge: { label: "IF 2024", value: "2.10" },
    metrics: [
      { value: "2.1", label: "Impact factor" },
      { value: "3.0", label: "CiteScore" },
      { value: "40%", label: "Acceptance Rate" },
      { value: "60 days", label: "Submission to first decision" },
      { value: "21 days", label: "Time to acceptance" },
    ],
  },
];

interface JournalsListViewProps {
  initialData?: Journal[];
}

export function JournalsListView({ initialData = [] }: JournalsListViewProps) {
  // Use initialData from server-side props or fallback to mock data
  const [journals] = useState(
    initialData.length > 0 ? initialData : mockJournals,
  );

  return (
    <div className="pt-12.5! section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
        {/* Left Sidebar - Filters */}
        <aside className="space-y-6">
          <div className="sticky top-32">
            <h3 className="heading-3 text-text-black mb-4 flex items-center justify-between gap-3">
              Refine Search Result
              <Icon name="Filter-Horizental" size={28} />
            </h3>

            <div className="space-y-4 max-h-140 overflow-y-auto">
              {/* Publication Count */}
              <FilterToolbar>
                <FilterToolbar.RadioGroup
                  label="Access Types"
                  options={accessTypeOptions}
                  paramName="access_type"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                <FilterToolbar.RadioGroup
                  label="Categories"
                  options={categoryOptions}
                  paramName="category"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                <FilterToolbar.RadioGroup
                  label="Languages"
                  options={languageOptions}
                  paramName="language"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                <FilterToolbar.RadioGroup
                  label="Licences"
                  options={licenseOptions}
                  paramName="license"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Field of Research */}
                <FilterToolbar.SearchableRadioGroup
                  label="Years"
                  options={yearOptions}
                  paramName="years"
                  searchPlaceholder="Search years..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Research Focus */}
                <FilterToolbar.SearchableRadioGroup
                  label="Institutions"
                  options={institutionOptions}
                  searchPlaceholder="Search institutions..."
                  paramName="institutions"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Countries */}
                <FilterToolbar.SearchableRadioGroup
                  label="Countries"
                  options={countryOptionsExtended}
                  paramName="country"
                  searchPlaceholder="Search country..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                <FilterToolbar.SearchableRadioGroup
                  label="Peer Review Types"
                  options={peerReviewOptions}
                  paramName="peer_review"
                  searchPlaceholder="Search peer review types..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                <FilterToolbar.SliderGroup
                  label="Journal Performance Metrics"
                  accordion
                  defaultOpen={false}
                  showCard
                  sliders={[
                    {
                      label: "Impact Factor",
                      paramName: "impact_factor",
                      min: 1,
                      max: 5,
                      step: 1,
                      defaultValue: 1,
                    },
                    {
                      label: "CiteScore",
                      paramName: "cite_score",
                      min: 1,
                      max: 10,
                      step: 1,
                      defaultValue: 1,
                    },
                    {
                      label: "Time to 1st Decision",
                      paramName: "time_to_decision",
                      min: 1,
                      max: 10,
                      step: 1,
                      defaultValue: 1,
                    },
                    {
                      label: "Time to Acceptance",
                      paramName: "time_to_acceptance",
                      min: 1,
                      max: 10,
                      step: 1,
                      defaultValue: 1,
                    },
                  ]}
                />
              </FilterToolbar>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {/* Search and Sort */}
          <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
            <FilterToolbar.Search
              placeholder="Search journals..."
              paramName="search"
              label="Search"
            />
            <FilterToolbar.Select
              label="Sort by"
              options={sortOptionsExtended}
              paramName="sort"
              placeholder="Relevance"
            />
          </FilterToolbar>

          {/* Results List */}
          {journals.map((journal) => (
            <div key={journal.id} className="space-y-6.25">
              <JournalCard
                title={journal.title}
                institution={
                  "institution_name" in journal
                    ? journal.institution_name
                    : journal.institution
                }
                imageUrl={
                  "cover_image_url" in journal
                    ? (journal.cover_image_url ?? undefined)
                    : "imageUrl" in journal
                      ? journal.imageUrl
                      : undefined
                }
                badge={
                  "stats" in journal && journal.stats?.impact_factor
                    ? {
                        label: "IF 2024",
                        value: journal.stats.impact_factor.toString(),
                      }
                    : "badge" in journal
                      ? journal.badge
                      : undefined
                }
                metrics={
                  "stats" in journal
                    ? [
                        {
                          value: journal.stats?.impact_factor?.toString() || 0,
                          label: "Impact factor",
                        },
                        {
                          value:
                            journal.stats?.total_publications?.toString() ||
                            "0",
                          label: "Total Publications",
                        },
                        {
                          value: journal.stats?.total_issues?.toString() || "0",
                          label: "Total Issues",
                        },
                      ]
                    : "metrics" in journal
                      ? journal.metrics
                      : [
                          {
                            value: 0,
                            label: "Impact factor",
                          },
                          {
                            value: "0",
                            label: "Total Publications",
                          },
                          {
                            value: "0",
                            label: "Total Issues",
                          },
                        ]
                }
                href={`/journals/${journal.id}`}
              />
            </div>
          ))}

          {/* Pagination */}
          {journals.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(journals.length / 10)}
              totalCount={journals.length}
              pageSize={10}
              showPageSizeSelector={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
