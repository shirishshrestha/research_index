"use client";

import { Icon } from "@/components/shared";
import { FilterToolbar, Pagination } from "@/features/shared/components";
import {
  accessTypeOptions,
  publicationTypeOptions,
  yearOptions,
  categoryOptions,
  institutionOptions,
  languageOptions,
} from "@/features/shared/constants/filterOptions";
import { ArticleCard } from "./ArticleCard";
import type { Publication } from "../types";
import { useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most_cited", label: "Most Cited" },
  { value: "title_asc", label: "Title (A-Z)" },
  { value: "title_desc", label: "Title (Z-A)" },
];

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
}

interface ArticlesListViewProps {
  initialPublications?: Publication[] | { results: Publication[] };
  pagination?: PaginationData;
}

export function ArticlesListView({
  initialPublications = [],
  pagination,
}: ArticlesListViewProps) {
  const publications: Publication[] = Array.isArray(initialPublications)
    ? initialPublications
    : (initialPublications?.results ?? []);
  const searchParams = useSearchParams();

  // Extract pagination info from URL
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");
  const totalCount = pagination?.count || publications.length;
  const totalPages = Math.ceil(totalCount / pageSize);

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
      
              <FilterToolbar>
                {/* Access Type */}
                <FilterToolbar.RadioGroup
                  label="Access Type"
                  options={accessTypeOptions}
                  paramName="access_type"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />

                {/* Publication Type */}
                <FilterToolbar.RadioGroup
                  label="Publication Type"
                  options={publicationTypeOptions}
                  paramName="publication_type"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />

                {/* Years */}
                <FilterToolbar.RadioGroup
                  label="Years"
                  options={yearOptions}
                  paramName="year"
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />

                {/* Categories */}
                <FilterToolbar.SearchableRadioGroup
                  label="Categories"
                  options={categoryOptions}
                  paramName="category"
                  searchPlaceholder="Search categories..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />

                {/* Institutions */}
                <FilterToolbar.SearchableRadioGroup
                  label="Institutions"
                  options={institutionOptions}
                  paramName="institution"
                  searchPlaceholder="Search institutions..."
                  accordion={true}
                  defaultOpen={false}
                  showCard={true}
                />

                {/* Languages */}
                <FilterToolbar.RadioGroup
                  label="Languages"
                  options={languageOptions}
                  paramName="language"
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
              placeholder="Search articles..."
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

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-text-gray">
              Showing {publications.length} of {totalCount} articles
            </p>
          </div>

          {/* Loading State */}
          {publications.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-gray text-lg">
                No articles found. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Results List */}
          {publications.length > 0 && (
            <>
              <div className="space-y-6.25 flex flex-col">
                {publications.map((publication) => (
                  <ArticleCard key={publication.id} publication={publication} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                pageSize={pageSize}
                showPageSizeSelector={true}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
