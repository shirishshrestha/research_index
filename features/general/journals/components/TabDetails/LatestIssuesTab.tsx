"use client";

import { Icon } from "@/components/shared";
import { FilterToolbar, Pagination } from "@/features/shared/components";
import {
  accessTypeOptions,
  publicationTypeOptions,
  yearOptions,
  categoryOptions,
  languageOptions,
} from "@/features/shared/constants/filterOptions";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/features/general/articles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  authors: string;
  publishedAt: string;
  doi: string;
  citations: number;
}

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.5829/nrip.2025.00123",
    citations: 33,
  },
  {
    id: "2",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.5829/nrip.2025.00123",
    citations: 33,
  },
  {
    id: "3",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.5829/nrip.2025.00123",
    citations: 33,
  },
  {
    id: "4",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.5829/nrip.2025.00123",
    citations: 33,
  },
  {
    id: "5",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.5829/nrip.2025.00123",
    citations: 33,
  },
];

export function LatestIssuesTab() {
  return (
    <div className=" ">
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

        {/* Main Content */}
        <div className="space-y-6">
          {/* Latest Issue Header */}
          <div>
            <h2 className="heading-3 text-primary mb-8.75">Latest Issue</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="heading-4 text-text-black">Volume 365</h3>
                <p className="desc text-base">December 2025</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <ChevronLeft size={20} />
                  <span>Previous vol/issue</span>
                </Button>
                <Button variant="outline" size="sm">
                  <span>Next vol/issue</span>
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>

          {/* Search */}
          <FilterToolbar containerClass="flex-row! items-end bg-white p-4 rounded-lg shadow-xs">
            <FilterToolbar.Search
              placeholder="Search articles...."
              paramName="search"
            />
          </FilterToolbar>

          {/* Pagination Top */}
          {mockArticles.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(40 / 5)}
              totalCount={40}
              pageSize={5}
              showPageSizeSelector={false}
            />
          )}

          {/* Results List */}
          {mockArticles.map((article) => (
            <div key={article.id} className="space-y-6.25">
              <ArticleCard {...article} />
            </div>
          ))}

          {/* Pagination Bottom */}
          {mockArticles.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(40 / 5)}
              totalCount={40}
              pageSize={5}
              showPageSizeSelector={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
