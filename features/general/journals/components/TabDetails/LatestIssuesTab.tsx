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
import { useJournalVolumes } from "../../api/journals.client";
import { Skeleton } from "@/components/ui/skeleton";

interface LatestIssuesTabProps {
  journalId: number;
}

export function LatestIssuesTab({ journalId }: LatestIssuesTabProps) {
  const {
    data: volumesData,
    isLoading: loading,
    error,
  } = useJournalVolumes(journalId);

  const volumes = volumesData?.volumes || [];

  // Get the first volume (latest)
  const latestVolume = volumes.length > 0 ? volumes[0] : null;

  if (loading) {
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
          <Skeleton className="h-10 w-40 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-destructive">
          Failed to load latest issues. Please try again later.
        </p>
      </div>
    );
  }

  if (!latestVolume || latestVolume.issues.length === 0) {
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
          {/* Latest Volume Header */}
          <div>
            <h2 className="heading-3 text-primary mb-8.75">Latest Issues</h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="heading-4 text-text-black">
                  Volume {latestVolume.volume} ({latestVolume.year || "N/A"})
                </h3>
                <span className="text-sm text-text-gray">
                  {latestVolume.issues_count}{" "}
                  {latestVolume.issues_count === 1 ? "issue" : "issues"} •{" "}
                  {latestVolume.articles_count}{" "}
                  {latestVolume.articles_count === 1 ? "article" : "articles"}
                </span>
              </div>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="grid gap-4">
            {latestVolume.issues.map((issue) => (
              <Card
                key={issue.id}
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg text-text-black">
                        Issue {issue.issue_number}
                      </h4>
                      {issue.is_special_issue && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-white rounded">
                          Special Issue
                        </span>
                      )}
                    </div>
                    {issue.title && (
                      <p className="text-sm text-text-gray mb-2">
                        {issue.title}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-text-gray">
                      <span>
                        Published:{" "}
                        {new Date(issue.publication_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        {issue.articles.length}{" "}
                        {issue.articles.length === 1 ? "article" : "articles"}
                      </span>
                    </div>
                  </div>
                  <Link href={`/journals/${journalId}/issues/${issue.id}`}>
                    <Button variant="default" size="sm">
                      View Issue
                    </Button>
                  </Link>
                </div>

                {/* Articles Preview */}
                {issue.articles.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="text-sm font-semibold text-text-black mb-3">
                      Articles in this issue:
                    </h5>
                    <div className="space-y-2">
                      {issue.articles.slice(0, 3).map((article, index) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.publication_id}`}
                          className="block p-3 rounded-md hover:bg-blue-02 transition-colors border border-border hover:border-primary/20"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xs font-medium text-text-gray mt-1 shrink-0">
                              {index + 1}.
                            </span>
                            <div className="flex-1 min-w-0">
                              <h6 className="text-sm font-semibold text-text-black mb-1 line-clamp-2">
                                {article.title}
                              </h6>
                              <p className="text-xs text-text-gray mb-1">
                                {article.authors}
                              </p>
                              {article.pages && (
                                <p className="text-xs text-text-gray">
                                  Pages: {article.pages}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                      {issue.articles.length > 3 && (
                        <Link
                          href={`/journals/${journalId}/issues/${issue.id}`}
                          className="block text-center py-2 text-sm text-primary hover:underline"
                        >
                          View all {issue.articles.length} articles →
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
