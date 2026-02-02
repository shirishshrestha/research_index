"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
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
        <h2 className="heading-3 text-primary!">All Issues</h2>
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
                <Accordion type="multiple" className="w-full space-y-3">
                  {volume.issues.map((issue) => (
                    <AccordionItem
                      key={issue.id}
                      value={`issue-${issue.id}`}
                      id={`issue-${issue.id}`}
                      className="border rounded-md scroll-mt-40"
                    >
                      <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-start justify-between w-full pr-4 text-left">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
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
                              <p className="text-sm text-text-gray mb-1">
                                {issue.title}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-text-gray">
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
                              <span>•</span>
                              <span>
                                {issue.articles.length}{" "}
                                {issue.articles.length === 1
                                  ? "article"
                                  : "articles"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        {issue.articles.length === 0 ? (
                          <p className="text-sm text-text-gray py-2">
                            No articles in this issue yet.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {issue.articles.map((article, index) => (
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
                                    <h4 className="text-sm font-semibold text-text-black mb-1 line-clamp-2">
                                      {article.title}
                                    </h4>
                                    <p className="text-xs text-text-gray mb-1">
                                      {article.authors}
                                    </p>
                                    {article.pages && (
                                      <p className="text-xs text-text-gray">
                                        Pages: {article.pages}
                                      </p>
                                    )}
                                    {article.doi && (
                                      <p className="text-xs text-primary mt-1">
                                        DOI: {article.doi}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
    </div>
  );
};
