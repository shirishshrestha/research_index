"use client";

import { ArticleCard } from "@/features/general/articles/components";
import type { Publication } from "@/features/general/articles/types";
import {
  FilterToolbar,
  Pagination,
  CategoryFilter,
} from "@/features/shared/components";
import { sortOptionsExtended } from "@/features/shared/constants/filterOptions";
import { useInstitutionPublications } from "@/features/general/publications/api/publications.client";

const categories = [
  { label: "Article", value: "article", count: 282 },
  { label: "Book", value: "book", count: 1 },
  { label: "Chapter", value: "chapter", count: 2 },
  { label: "Conference Paper", value: "conference", count: 27 },
  { label: "Data", value: "data", count: 1 },
  { label: "Preprint", value: "preprint", count: 49 },
];

const mockPublications: Publication[] = [
  {
    id: 1,
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    abstract:
      "This study examines the effects of climate change on rice cultivation patterns in Nepal.",
    publication_type: "journal_article",
    publication_type_display: "Journal Article",
    pdf_file: "",
    pdf_url: "https://example.com/paper1.pdf",
    doi: "10.58291/nrjp.2025.00123",
    published_date: "2025-05-02",
    journal: 1,
    journal_id: 1,
    journal_title: "Journal of Agricultural Research",
    journal_issn: "2091-0878",
    volume: "45",
    issue: 3,
    pages: "123-145",
    publisher: "Nepal Research Index",
    co_authors: "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher",
    erratum_from: null,
    erratum_from_title: "",
    pubmed_id: "",
    arxiv_id: "",
    pubmed_central_id: "",
    topic_branch: null,
    is_published: true,
    created_at: "2025-05-02T00:00:00Z",
    updated_at: "2025-05-02T00:00:00Z",
    author_id: 1,
    author_name: "Dr. Ram Prasad Yadav",
    author_email: "ram.yadav@example.com",
    author_orcid: "",
    mesh_terms: [],
    citations: [],
    references: [],
    link_outs: [],
    stats: {
      citations_count: 33,
      reads_count: 245,
      downloads_count: 89,
      recommendations_count: 12,
      altmetric_score: "8.5",
      field_citation_ratio: "1.2",
      last_updated: "2025-05-02T00:00:00Z",
    },
  },
  {
    id: 2,
    title: "Advances in Medical Science and Clinical Practice",
    abstract:
      "Recent advances in medical science and their clinical applications.",
    publication_type: "journal_article",
    publication_type_display: "Journal Article",
    pdf_file: "",
    pdf_url: "https://example.com/paper2.pdf",
    doi: "10.58291/nrjp.2025.00128",
    published_date: "2025-04-18",
    journal: 2,
    journal_id: 2,
    journal_title: "Nepal Medical Journal",
    journal_issn: "2091-0789",
    volume: "12",
    issue: 2,
    pages: "78-95",
    publisher: "Nepal Research Index",
    co_authors: "Dr. Bikash Thapa, Dr. Ram Prasad Yadav",
    erratum_from: null,
    erratum_from_title: "",
    pubmed_id: "",
    arxiv_id: "",
    pubmed_central_id: "",
    topic_branch: null,
    is_published: true,
    created_at: "2025-04-18T00:00:00Z",
    updated_at: "2025-04-18T00:00:00Z",
    author_id: 2,
    author_name: "Dr. Sita Sharma",
    author_email: "sita.sharma@example.com",
    author_orcid: "",
    mesh_terms: [],
    citations: [],
    references: [],
    link_outs: [],
    stats: {
      citations_count: 41,
      reads_count: 298,
      downloads_count: 112,
      recommendations_count: 18,
      altmetric_score: "9.2",
      field_citation_ratio: "1.3",
      last_updated: "2025-04-18T00:00:00Z",
    },
  },
  {
    id: 3,
    title: "Public Health Initiatives in Karnali Province",
    abstract:
      "A comprehensive study of public health initiatives in Karnali Province.",
    publication_type: "journal_article",
    publication_type_display: "Journal Article",
    pdf_file: "",
    pdf_url: "https://example.com/paper3.pdf",
    doi: "10.58291/nrjp.2025.00129",
    published_date: "2025-03-25",
    journal: 2,
    journal_id: 2,
    journal_title: "Nepal Medical Journal",
    journal_issn: "2091-0789",
    volume: "12",
    issue: 1,
    pages: "23-45",
    publisher: "Nepal Research Index",
    co_authors: "Dr. Sita Sharma",
    erratum_from: null,
    erratum_from_title: "",
    pubmed_id: "",
    arxiv_id: "",
    pubmed_central_id: "",
    topic_branch: null,
    is_published: true,
    created_at: "2025-03-25T00:00:00Z",
    updated_at: "2025-03-25T00:00:00Z",
    author_id: 3,
    author_name: "Dr. Bikash Thapa",
    author_email: "bikash.thapa@example.com",
    author_orcid: "",
    mesh_terms: [],
    citations: [],
    references: [],
    link_outs: [],
    stats: {
      citations_count: 37,
      reads_count: 267,
      downloads_count: 98,
      recommendations_count: 14,
      altmetric_score: "8.1",
      field_citation_ratio: "1.15",
      last_updated: "2025-03-25T00:00:00Z",
    },
  },
];

interface ResearchTabProps {
  institutionId?: number;
}

export const ResearchTab = ({ institutionId }: ResearchTabProps) => {
  const {
    data: publications = [],
    isLoading,
    error,
  } = useInstitutionPublications(institutionId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6 ">
        <CategoryFilter categories={categories} />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6 ">
        <CategoryFilter categories={categories} />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-destructive">Failed to load publications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6 ">
      {/* Left Sidebar - Categories */}
      <CategoryFilter categories={categories} />

      {/* Right Content - Articles */}
      <div className="space-y-6.25">
        {/* Search and Sort */}
        <FilterToolbar containerClass="flex-row! bg-white p-4 rounded-lg shadow-xs">
          <FilterToolbar.Search
            placeholder="Search publications..."
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
