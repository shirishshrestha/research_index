"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { JournalSidebarNav } from "../JournalSidebarNav";
import { useJournalVolumes } from "../../api/journals.client";
import Link from "next/link";
import { useMemo } from "react";

interface AllIssuesTabProps {
  journalId: number;
}

export const AllIssuesTab = ({ journalId }: AllIssuesTabProps) => {
  const {
    data: volumesData,
    isLoading: loading,
    error,
  } = useJournalVolumes(journalId);

  const volumes = useMemo(
    () => volumesData?.volumes || [],
    [volumesData?.volumes],
  );

  // Generate sidebar sections from volumes
  const sidebarSections = useMemo(
    () =>
      volumes.map((volume) => ({
        title: `Volume ${volume.volume} (${volume.year || "N/A"})`,
        items: volume.issues.map((issue) => ({
          id: `issue-${issue.id}`,
          label: `Issue ${issue.issue_number}`,
          href: `#issue-${issue.id}`,
        })),
      })),
    [volumes],
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
        {/* Sidebar Skeleton */}
        <aside className="">
          <div className="flex flex-col gap-1.25 sticky top-32">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <div className="pl-4 space-y-1.5">
                    {[1, 2].map((j) => (
                      <Skeleton key={j} className="h-5 w-4/5" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <aside className="space-y-6.25">
          <Skeleton className="h-9 w-40" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg px-6 py-4 shadow-xs space-y-4"
              >
                {/* Volume Header */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-5 w-32" />
                </div>
                {/* Issues */}
                <div className="space-y-3 pl-4">
                  {[1, 2].map((j) => (
                    <div key={j} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="pl-4 space-y-2">
                        {[1, 2, 3].map((k) => (
                          <Skeleton key={k} className="h-16 w-full" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
        <aside className="">
          <div className="flex flex-col gap-1.25 sticky top-32">
            <div className="h-96 flex items-center justify-center">
              <p className="text-destructive">Failed to load issues</p>
            </div>
          </div>
        </aside>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-destructive">
            Failed to load issues. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (volumes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-text-gray">No published issues yet.</p>
      </div>
    );
  }

  const sections = sidebarSections.length > 0 ? sidebarSections : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      {/* Sidebar Navigation */}
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <JournalSidebarNav sections={sections} />
        </div>
      </aside>

      {/* Main Content */}
      <aside className="space-y-6.25">
        <div className="flex items-center justify-between">
          <h2 className="heading-3 text-primary!">All Issues</h2>
          <Link href={`/issues?journal=${journalId}`}>
            <Button variant="outline" size="sm">
              View All Issues →
            </Button>
          </Link>
        </div>
        <Accordion type="multiple" className="w-full space-y-4">
          {volumes.map((volume) => (
            <AccordionItem
              key={volume.volume}
              value={`volume-${volume.volume}`}
              className="border rounded-lg px-6 py-2 shadow-xs"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="heading-4 text-lg! text-text-black">
                    Volume {volume.volume} ({volume.year || "N/A"})
                  </span>
                  <span className="text-sm text-text-gray">
                    {volume.issues_count}{" "}
                    {volume.issues_count === 1 ? "issue" : "issues"} •{" "}
                    {volume.articles_count}{" "}
                    {volume.articles_count === 1 ? "article" : "articles"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  {volume.issues.map((issue) => (
                    <div
                      key={issue.id}
                      id={`issue-${issue.id}`}
                      className="block scroll-mt-40"
                    >
                      <div className="border rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all h-full">
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-base text-text-black">
                                Issue {issue.issue_number}
                              </span>
                              {issue.is_special_issue && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-white rounded">
                                  Special Issue
                                </span>
                              )}
                            </div>
                            {issue.title && (
                              <p
                                className="text-sm text-text-gray mb-2 line-clamp-2"
                                title={issue.title}
                              >
                                {issue.title}
                              </p>
                            )}
                            <div className="flex flex-col gap-1 text-xs text-text-gray">
                              <span>
                                Published:{" "}
                                {new Date(
                                  issue.publication_date,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                              <span>
                                {issue.articles.length}{" "}
                                {issue.articles.length === 1
                                  ? "article"
                                  : "articles"}
                              </span>
                            </div>
                          </div>

                          {issue.articles.length > 0 && (
                            <div className="pt-3 border-t">
                              <p className="text-xs font-medium text-text-gray mb-2">
                                Recent articles:
                              </p>
                              <div className="space-y-2">
                                {issue.articles.slice(0, 2).map((article) => (
                                  <Link
                                    key={article.id}
                                    className="text-xs"
                                    href={`/articles/${article.publication_id}`}
                                  >
                                    <p
                                      className="font-medium text-text-black line-clamp-1"
                                      title={article.title}
                                    >
                                      {article.title}
                                    </p>
                                    <p
                                      className="text-text-gray line-clamp-1"
                                      title={article.authors}
                                    >
                                      {article.authors}
                                    </p>
                                  </Link>
                                ))}
                                {issue.articles.length > 2 && (
                                  <Link
                                    href={`/issues/?journal=${journalId}/`}
                                    className="text-xs text-primary font-medium"
                                  >
                                    +{issue.articles.length - 2} more articles
                                  </Link>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    </div>
  );
};
