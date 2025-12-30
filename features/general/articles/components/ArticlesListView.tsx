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

const mockArticles = [
  {
    id: "1",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.58291/nrip.2025.00123",
    badge: { label: "33 Cite", value: "33" },
  },
  {
    id: "2",
    title: "Sustainable Agricultural Practices in Mountain Communities",
    authors: "Ramesh Kumar, Sita Devi, Prakash Sharma",
    publishedAt: "15 Apr 2025",
    doi: "10.58291/nrip.2025.00089",
    badge: { label: "25 Cite", value: "25" },
  },
  {
    id: "3",
    title: "Water Resource Management in the Himalayan Region",
    authors: "Maya Thapa, Bikram Rai, Anita Gurung",
    publishedAt: "28 Mar 2025",
    doi: "10.58291/nrip.2025.00067",
    badge: { label: "18 Cite", value: "18" },
  },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most_cited", label: "Most Cited" },
  { value: "title_asc", label: "Title (A-Z)" },
  { value: "title_desc", label: "Title (Z-A)" },
];

export function ArticlesListView() {
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
            />
            <FilterToolbar.Select
              label="Sort by"
              options={sortOptions}
              paramName="sort"
              placeholder="Relevance"
            />
          </FilterToolbar>

          {mockArticles.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(400 / 10)}
              totalCount={400}
              pageSize={10}
              showPageSizeSelector={false}
            />
          )}

          {/* Results List */}
          {mockArticles.map((article) => (
            <div key={article.id} className="space-y-6.25">
              <ArticleCard
                title={article.title}
                authors={article.authors}
                publishedAt={article.publishedAt}
                doi={article.doi}
                badge={article.badge}
                href={`/articles/${article.id}`}
              />
            </div>
          ))}

          {/* Pagination */}
          {mockArticles.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(400 / 10)}
              totalCount={400}
              pageSize={10}
              showPageSizeSelector={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
