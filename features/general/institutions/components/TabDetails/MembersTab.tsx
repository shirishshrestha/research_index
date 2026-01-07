"use client";

import { Category, CategoryFilter, ListCard } from "@/features/shared";
import { FilterToolbar } from "@/features/shared/components/search/FilterToolbar";

const categories: Category[] = [
  { label: "Members", value: "members", count: 12 },
];

const mockAuthors = [
  {
    id: "1",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "2",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "3",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "4",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
  },
  {
    id: "5",
    name: "Dr. Ram Prasad Yadav",
    position: "Associate Professor of Biostatistics, KRI Medical College",
    affiliation: "Kathmandu University (KU)",
    verifiedAffiliation: "Verified central.kathmandu.p",
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

export const MembersTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <CategoryFilter categories={categories} />
        </div>
      </aside>
      <aside className="space-y-6.25">
        {/* Search and Sort */}
        <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
          <FilterToolbar.Search
            placeholder="Search members..."
            paramName="search"
          />
          <FilterToolbar.Select
            label="Sort by"
            options={sortOptions}
            paramName="sort"
            placeholder="Relevance"
          />
        </FilterToolbar>
        {mockAuthors.map((author) => (
          <ListCard key={author.id} {...author} href="/authors/1" />
        ))}
      </aside>
    </div>
  );
};
