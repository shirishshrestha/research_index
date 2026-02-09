"use client";

import { Icon } from "@/components/shared";
import {
  FilterToolbar,
  ListCard,
  Pagination,
} from "@/features/shared/components";
import type { Author } from "../types";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

interface AuthorsListViewProps {
  initialData?: Author[];
  pagination?: PaginationData;
}

export function AuthorsListView({
  initialData = [],
  pagination,
}: AuthorsListViewProps) {
  const [authors] = useState<Author[]>(initialData);
  const searchParams = useSearchParams();

  // Extract pagination info from URL
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");
  const totalCount = pagination?.count || authors.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const publicationCountOptions = [
    { value: "1-10", label: "1 - 10" },
    { value: "11-30", label: "11 - 30" },
    { value: "31-50", label: "31 - 50" },
    { value: "51-100", label: "51 - 100" },
    { value: "100+", label: "More than 140" },
  ];

  const affiliationOptions = [
    { value: "tu", label: "Tribhuvan University (TU)" },
    { value: "ku", label: "Kathmandu University (KU)" },
    { value: "pu", label: "Pokhara University (PU)" },
    { value: "nast", label: "Nepal Academy of Science and Technology (NAST)" },
    { value: "purbanchal", label: "Purbanchal University (APU)" },
  ];

  const fieldOptions = [
    { value: "agriculture", label: "Agriculture" },
    { value: "economics", label: "Economics" },
    { value: "education", label: "Education" },
    { value: "environment", label: "Environment" },
    { value: "humanities", label: "Humanities" },
  ];

  const countryOptions = [
    { value: "nepal", label: "Nepal" },
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
    { value: "uk", label: "UK" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "publications", label: "Most Publications" },
  ];

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
                  label="Publication Count"
                  options={publicationCountOptions}
                  paramName="publication_count"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Affiliations */}
                <FilterToolbar.SearchableRadioGroup
                  label="Affiliations"
                  options={affiliationOptions}
                  paramName="affiliation"
                  searchPlaceholder="Search affiliations..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Field of Research */}
                <FilterToolbar.SearchableRadioGroup
                  label="Field of Research"
                  options={fieldOptions}
                  paramName="field"
                  searchPlaceholder="Search categories..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
                {/* Countries */}
                <FilterToolbar.SearchableRadioGroup
                  label="Countries"
                  options={countryOptions}
                  paramName="country"
                  searchPlaceholder="Search country..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />
              </FilterToolbar>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {/* Search and Sort */}
          <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
            <FilterToolbar.Search
              placeholder="Search authors..."
              paramName="search"
              label="Search"
            />
            <FilterToolbar.Select
              label="Sort by"
              options={sortOptions}
              paramName="sort"
              placeholder="Relevance"
            />
          </FilterToolbar>

          {/* Results List */}
          {authors.length > 0 ? (
            <div className="space-y-4">
              {authors.map((author) => (
                <ListCard
                  key={author.id}
                  id={String(author.id)}
                  name={`${author.title} ${author.full_name}`}
                  position={`${author.designation} • ${author.institute}`}
                  verifiedAffiliation={
                    author.orcid
                      ? `ORCID: ${author.orcid}`
                      : author.degree
                        ? author.degree
                        : ""
                  }
                  imageUrl={author.profile_picture_url || undefined}
                  href={`/authors/${author.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-gray text-lg">No authors found</p>
            </div>
          )}

          {/* Pagination */}
          {authors.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              showPageSizeSelector={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
