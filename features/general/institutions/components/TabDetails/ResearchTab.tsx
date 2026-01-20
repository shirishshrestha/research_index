"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  FilterToolbar,
  Pagination,
  CategoryFilter,
} from "@/features/shared/components";
import { sortOptionsExtended } from "@/features/shared/constants/filterOptions";

const categories = [
  { label: "Article", value: "article", count: 282 },
  { label: "Book", value: "book", count: 1 },
  { label: "Chapter", value: "chapter", count: 2 },
  { label: "Conference Paper", value: "conference", count: 27 },
  { label: "Data", value: "data", count: 1 },
  { label: "Preprint", value: "preprint", count: 49 },
];

const mockArticles = [
  {
    id: "1",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.58291/nrjp.2025.00123",
    citations: 33,
    href: "/articles/1",
  },
  {
    id: "2",
    title: "Advances in Medical Science and Clinical Practice",
    authors: "Dr. Sita Sharma, Dr. Bikash Thapa, Dr. Ram Prasad Yadav",
    publishedAt: "18 April 2025",
    doi: "10.58291/nrjp.2025.00128",
    citations: 41,
    href: "/articles/2",
  },
  {
    id: "3",
    title: "Public Health Initiatives in Karnali Province",
    authors: "Dr. Bikash Thapa, Dr. Sita Sharma",
    publishedAt: "25 March 2025",
    doi: "10.58291/nrjp.2025.00129",
    citations: 37,
    href: "/articles/3",
  },
  {
    id: "4",
    title: "Biomedical Research in Rural Healthcare Settings",
    authors: "Dr. Ram Prasad Yadav, Dr. Sita Sharma, Dr. Bikash Thapa",
    publishedAt: "12 February 2025",
    doi: "10.58291/nrjp.2025.00130",
    citations: 29,
    href: "/articles/4",
  },
  {
    id: "5",
    title: "Nursing and Allied Health: Best Practices and Innovations",
    authors: "Dr. Sita Sharma, Glenn S. Orton",
    publishedAt: "08 January 2025",
    doi: "10.58291/nrjp.2025.00131",
    citations: 24,
    href: "/articles/5",
  },
];

export const ResearchTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6 ">
      {/* Left Sidebar - Categories */}
      <CategoryFilter categories={categories} />

      {/* Right Content - Articles */}
      <div className="space-y-6.25">
        {/* Search and Sort */}
        <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
          <FilterToolbar.Search
            placeholder="Search authors..."
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
        {mockArticles.length > 0 && (
          <Pagination
            currentPage={1}
            totalPages={Math.ceil(400 / 10)}
            totalCount={400}
            pageSize={10}
            showPageSizeSelector={false}
          />
        )}
        <div className="flex flex-col gap-6.25">
          {mockArticles.map((article) => (
            <Link key={article.id} href={article.href}>
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{article.authors}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.doi}</span>
                  <span>•</span>
                  <span>{article.citations} Citations</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
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
  );
};
