"use client";

import { Icon } from "@/components/shared";
import {
  FilterToolbar,
  ListCard,
  Pagination,
} from "@/features/shared/components";

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

export function AuthorsListView() {
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
          {mockAuthors.length > 0 && (
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(400 / 10)}
              totalCount={400}
              pageSize={10}
              showPageSizeSelector={false}
            />
          )}

          {/* Results List */}
          <div className="space-y-4">
            {mockAuthors.map((author) => (
              <ListCard key={author.id} {...author} href="/authors/1" />
            ))}
          </div>

          {/* Pagination */}
          {mockAuthors.length > 0 && (
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
