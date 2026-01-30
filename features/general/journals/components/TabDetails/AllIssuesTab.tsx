"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JournalSidebarNav } from "../JournalSidebarNav";
import { useJournalIssues } from "../../api/journals.client";
import type { Issue } from "../../api/journals.server";
import Link from "next/link";
import { useMemo } from "react";

interface VolumeGroup {
  volume: number;
  year: number;
  issues: Issue[];
}

interface AllIssuesTabProps {
  journalId: number;
}

export const AllIssuesTab = ({ journalId }: AllIssuesTabProps) => {
  const {
    data: issues = [],
    isLoading: loading,
    error,
  } = useJournalIssues(journalId);

  // Group issues by volume
  const volumes = useMemo(() => {
    const volumeMap = new Map<number, VolumeGroup>();

    issues.forEach((issue) => {
      if (!volumeMap.has(issue.volume)) {
        const year = new Date(issue.publication_date).getFullYear();
        volumeMap.set(issue.volume, {
          volume: issue.volume,
          year,
          issues: [],
        });
      }
      volumeMap.get(issue.volume)!.issues.push(issue);
    });

    // Convert to array and sort by volume (descending)
    return Array.from(volumeMap.values()).sort((a, b) => b.volume - a.volume);
  }, [issues]);

  // Generate sidebar sections from volumes
  const sidebarSections = useMemo(
    () =>
      volumes.map((volumeGroup) => ({
        title: `Volume ${volumeGroup.volume} (${volumeGroup.year})`,
        items: volumeGroup.issues.map((issue) => ({
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
        <aside className="">
          <div className="flex flex-col gap-1.25 sticky top-32">
            <div className="h-96 flex items-center justify-center">
              <p className="text-text-gray">Loading issues...</p>
            </div>
          </div>
        </aside>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-text-gray">Loading content...</p>
        </div>
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
        <p className="text-text-gray">No issues published yet.</p>
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
          {volumes.map((volumeGroup) => (
            <AccordionItem
              key={volumeGroup.volume}
              value={`volume-${volumeGroup.volume}`}
              className="border rounded-lg px-6 py-2 shadow-xs"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="heading-4 text-lg! text-text-black">
                    Volume {volumeGroup.volume} ({volumeGroup.year})
                  </span>
                  <span className="text-sm text-text-gray">
                    {volumeGroup.issues.length}{" "}
                    {volumeGroup.issues.length === 1 ? "issue" : "issues"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {volumeGroup.issues.map((issue) => (
                    <Link
                      key={issue.id}
                      href={`/journals/${journalId}/issues/${issue.id}`}
                      id={`issue-${issue.id}`}
                      className="flex items-center justify-between p-4 rounded-md hover:bg-blue-02 transition-colors border border-border hover:border-primary/20 scroll-mt-40"
                    >
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
                          {issue.status !== "published" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                              {issue.status_display}
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
                            {issue.articles_count}{" "}
                            {issue.articles_count === 1
                              ? "article"
                              : "articles"}
                          </span>
                        </div>
                      </div>
                    </Link>
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
