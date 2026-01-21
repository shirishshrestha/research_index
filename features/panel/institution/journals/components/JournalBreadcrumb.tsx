import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface JournalBreadcrumbProps {
  journalId?: number;
  journalTitle?: string;
  currentPage: "list" | "detail" | "edit" | "create" | "questionnaire";
}

export function JournalBreadcrumb({
  journalId,
  journalTitle,
  currentPage,
}: JournalBreadcrumbProps) {
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

        {currentPage !== "list" && currentPage !== "create" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentPage === "detail" ? (
                <BreadcrumbPage>
                  {journalTitle || `Journal ${journalId}`}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/institution/journals/${journalId}`}>
                    {journalTitle || `Journal ${journalId}`}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentPage === "create" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Journal</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {currentPage === "edit" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {currentPage === "questionnaire" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Questionnaire</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
