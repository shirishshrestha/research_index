"use client";

import { ArticleCard } from "@/features/general/articles/components";
import type { Publication } from "@/features/general/articles/types";
import {
  FilterToolbar,
  Pagination,
  CategoryFilter,
} from "@/features/shared/components";
import { sortOptionsExtended } from "@/features/shared/constants/filterOptions";
import { useAuthorPublications } from "@/features/general/publications/api/publications.client";

const categories = [
  { label: "Article", value: "article", count: 282 },
  { label: "Book", value: "book", count: 1 },
  { label: "Chapter", value: "chapter", count: 2 },
  { label: "Conference Paper", value: "conference", count: 27 },
  { label: "Data", value: "data", count: 1 },
  { label: "Preprint", value: "preprint", count: 49 },
];

interface ResearchTabProps {
  authorId?: number;
}

export const ResearchTab = ({ authorId }: ResearchTabProps) => {
  const {
    data: publications = [],
    isLoading,
    error,
  } = useAuthorPublications(authorId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
        <CategoryFilter categories={categories} />
        <div className="flex items-center justify-center min-h-100">
          <p className="text-muted-foreground">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
        <CategoryFilter categories={categories} />
        <div className="flex items-center justify-center min-h-100">
          <p className="text-destructive">Failed to load publications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      {/* Left Sidebar - Categories */}
      <CategoryFilter categories={categories} />

      {/* Right Content - Articles */}
      <div className="space-y-6.25">
        {/* Search and Sort */}
        <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
          <FilterToolbar.Search
            placeholder="Search publications..."
            paramName="search"
          />
          <FilterToolbar.Select
            label="Sort by"
            options={sortOptionsExtended}
            paramName="sort"
            placeholder="Relevance"
          />
        </FilterToolbar>

        <div className="flex flex-col gap-6.25">
          {publications.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No publications found
            </p>
          ) : (
            publications.map((publication) => (
              <ArticleCard key={publication.id} publication={publication} />
            ))
          )}
        </div>
        {publications.length > 0 && (
          <Pagination
            currentPage={1}
            totalPages={Math.ceil(publications.length / 10)}
            totalCount={publications.length}
            pageSize={10}
            showPageSizeSelector={false}
          />
        )}
      </div>
    </div>
  );
};
