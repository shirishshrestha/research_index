"use client";

import { useArticleCitations } from "../../hooks/useArticleData";
import type { Publication } from "@/features/panel/author/publications/types";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CitationsTabProps {
  article: Publication;
}

export const CitationsTab = ({ article }: CitationsTabProps) => {
  const { data, isLoading, error } = useArticleCitations(article.doi);

  if (!article.doi) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No DOI available for this article. Citations cannot be fetched.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading citations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading citations: {(error as Error).message}
        </AlertDescription>
      </Alert>
    );
  }

  const citationCount =
    data?.data?.citation_count || data?.data?.is_referenced_by_count || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <p
            className={`w-full text-left p-2.5 rounded-md transition-all border border-white-02 bg-white hover:bg-gray-50`}
          >
            <span className="text-base text-text-black">
              All Citations ({citationCount})
            </span>
          </p>
        </div>
      </aside>
      <aside className="space-y-8.75 flex flex-col">
        {citationCount === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No citations found for this article yet.
            </p>
          </div>
        ) : (
          <div className="p-6 border rounded-lg bg-white">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">
                {citationCount}
              </p>
              <p className="text-muted-foreground">Total Citations</p>
              <p className="text-sm text-muted-foreground mt-4">
                Citation details from citing works are available through
                Crossref. Individual citing articles will be displayed as they
                become available.
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
