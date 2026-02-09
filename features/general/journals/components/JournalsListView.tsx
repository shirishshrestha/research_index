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

interface JournalsListViewProps {
  initialData?: Journal[];
}

export function JournalsListView({ initialData = [] }: JournalsListViewProps) {
  // Use journals from server-side props
  const journals = initialData;
  const totalResults = journals.length;

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

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-text-gray">
              Showing {journals.length} of {totalResults} results
            </p>
          </div>

          {/* Loading State */}
          {journals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-gray text-lg">
                No journals found. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Results List */}
          {journals.length > 0 &&
            journals.map((journal) => (
              <div key={journal.id} className="space-y-6.25">
                <JournalCard
                  title={journal.title}
                  institution={journal.institution_name}
                  imageUrl={journal.cover_image_url ?? undefined}
                  badge={
                    journal.stats?.impact_factor
                      ? {
                          label: "IF 2024",
                          value: journal.stats.impact_factor.toString(),
                        }
                      : undefined
                  }
                  metrics={[
                    {
                      value: journal.stats?.impact_factor?.toString() || "0",
                      label: "Impact factor",
                    },
                    {
                      value:
                        journal.stats?.total_publications?.toString() || "0",
                      label: "Total Publications",
                    },
                    {
                      value: journal.stats?.total_issues?.toString() || "0",
                      label: "Total Issues",
                    },
                  ]}
                  href={`/journals/${journal.id}`}
                />
              </div>
            ))}

          {/* Pagination */}
          {journals.length > 10 && (
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
