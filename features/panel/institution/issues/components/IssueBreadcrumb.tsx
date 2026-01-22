"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useJournalQuery } from "@/features/panel/institution/journals";

interface IssueBreadcrumbProps {
  journalId: number | string;
  issueId?: number | string;
  currentPage: "list" | "detail" | "edit" | "create";
}

export function IssueBreadcrumb({
  journalId,
  issueId,
  currentPage,
}: IssueBreadcrumbProps) {
  const { data: journal } = useJournalQuery(journalId);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/institution/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/institution/journals">Journals</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/institution/journals/${journalId}`}>
              {journal?.title || `Journal ${journalId}`}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {currentPage === "list" ? (
            <BreadcrumbPage>Issues</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={`/institution/journals/${journalId}/issues`}>
                Issues
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {currentPage === "create" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Issue</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {currentPage === "detail" && issueId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Issue Details</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {currentPage === "edit" && issueId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/institution/journals/${journalId}/issues/${issueId}`}
                >
                  Issue Details
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
