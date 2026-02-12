"use client";

import { useState } from "react";
import { usePublicIssues } from "../api/issues.client";
import { IssueCard } from "./IssueCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterToolbar, Pagination } from "@/features/shared/components";
import { Icon } from "@/components/shared";
import { useSearchParams, useRouter } from "next/navigation";
import type { IssueListItem } from "../api/issues.server";

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

const issueTypeOptions = [
  { value: "regular", label: "Regular Issue" },
  { value: "special", label: "Special Issue" },
];

interface IssuesListViewProps {
  initialData?: any;
}

export function IssuesListView({ initialData }: IssuesListViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "12");
  const journal = searchParams.get("journal") || undefined;
  const year = searchParams.get("year") || undefined;
  const search = searchParams.get("search") || undefined;
  const issueType = searchParams.get("issue_type");

  const { data, isLoading, error } = usePublicIssues(
    {
      journal: journal ? parseInt(journal) : undefined,
      year: year ? parseInt(year) : undefined,
      search,
      is_special_issue:
        issueType === "special"
          ? true
          : issueType === "regular"
            ? false
            : undefined,
      status: "published",
      sort: "-publication_date",
    },
    { page, page_size: pageSize },
  );

  const issues: IssueListItem[] = data?.results || initialData?.results || [];
  const totalCount = data?.count || initialData?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading && !initialData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
        <aside className="space-y-6">
          <div className="sticky top-32">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        </aside>
        <div className="space-y-6">
          <Skeleton className="h-10 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-destructive">
          Failed to load issues. Please try again later.
        </p>
      </div>
    );
  }

  return (
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
              {/* Year Filter */}
              <FilterToolbar.RadioGroup
                label="Year"
                options={yearOptions}
                paramName="year"
                accordion={true}
                defaultOpen={false}
                showCard={true}
              />

              {/* Issue Type Filter */}
              <FilterToolbar.RadioGroup
                label="Issue Type"
                options={issueTypeOptions}
                paramName="issue_type"
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-3 text-primary mb-2">Published Issues</h2>
            <p className="text-sm text-text-gray">
              {totalCount} {totalCount === 1 ? "issue" : "issues"} found
            </p>
          </div>
        </div>

        {/* Issues Grid */}
        {issues.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-text-gray">No issues found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", newPage.toString());
                    router.push(`/issues?${params.toString()}`);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
