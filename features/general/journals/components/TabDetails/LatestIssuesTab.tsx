"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared";
import { FilterToolbar } from "@/features/shared/components";
import {
  accessTypeOptions,
  publicationTypeOptions,
  yearOptions,
  categoryOptions,
  languageOptions,
} from "@/features/shared/constants/filterOptions";
import { Button } from "@/components/ui/button";
import { useJournalIssues } from "../../api/journals.client";

interface LatestIssuesTabProps {
  journalId: number;
}

export function LatestIssuesTab({ journalId }: LatestIssuesTabProps) {
  const {
    data: issues = [],
    isLoading: loading,
    error,
  } = useJournalIssues(journalId, { status: "published" });

  // Get the latest issue (first one)
  const latestIssue = issues.length > 0 ? issues[0] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-text-gray">Loading latest issue...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-destructive">
          Failed to load latest issue. Please try again later.
        </p>
      </div>
    );
  }

  if (!latestIssue) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-text-gray">No published issues yet.</p>
      </div>
    );
  }

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
                <h3 className="heading-4 text-text-black">
                  Volume {latestIssue.volume}, Issue {latestIssue.issue_number}
                </h3>
                <p className="desc text-base">
                  {new Date(latestIssue.publication_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                    },
                  )}
                </p>
                {latestIssue.title && (
                  <p className="text-sm text-text-gray mt-1">
                    {latestIssue.title}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Link href={`/journals/${journalId}/issues/${latestIssue.id}`}>
                  <Button variant="default" size="sm">
                    View Full Issue
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Message about articles */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              This issue contains <strong>{latestIssue.articles_count}</strong>{" "}
              {latestIssue.articles_count === 1 ? "article" : "articles"}.{" "}
              <Link
                href={`/journals/${journalId}/issues/${latestIssue.id}`}
                className="underline font-semibold"
              >
                View full issue details
              </Link>{" "}
              to see all articles.
            </p>
          </div>

          {/* If you have articles in the Issue type, display them */}
          {/* For now, showing a placeholder as articles need to be fetched from issue detail endpoint */}
        </div>
      </div>
    </div>
  );
}
