"use client";

import { useArticleReferences } from "../../hooks/useArticleData";
import type { Publication } from "@/features/panel/author/publications/types";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReferencesTabProps {
  article: Publication;
}

export const ReferencesTab = ({ article }: ReferencesTabProps) => {
  const { data, isLoading, error } = useArticleReferences(article.doi);

  if (!article.doi) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No DOI available for this article. References cannot be fetched.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">
          Loading references...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading references: {(error as Error).message}
        </AlertDescription>
      </Alert>
    );
  }

  const references = data?.data?.references || [];
  const referenceCount = data?.data?.reference_count || 0;

  if (referenceCount === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No references found for this article.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <p
            className={`w-full text-left p-2.5 rounded-md transition-all border border-white-02 bg-white hover:bg-gray-50`}
          >
            <span className="text-base text-text-black">
              All References ({referenceCount})
            </span>
          </p>
        </div>
      </aside>
      <aside className="space-y-8.75 pl-6">
        {references.map((reference, index) => (
          <li
            key={reference.key || index}
            className="space-y-3.75 list-decimal text-primary "
          >
            <div className="space-y-1.25">
              <p className="heading-para text-primary!">
                {reference["article-title"] ||
                  reference.unstructured ||
                  reference.key ||
                  `Reference ${index + 1}`}
              </p>
              {reference.author && (
                <p className="sub-body">{reference.author}</p>
              )}
              <div className="sub-body italic! space-x-2">
                {reference.year && <span>Published: {reference.year}</span>}
                {reference.doi && (
                  <>
                    {reference.year && <span>·</span>}
                    <span>DOI: {reference.doi}</span>
                  </>
                )}
                {reference.journal && (
                  <>
                    {(reference.year || reference.doi) && <span>·</span>}
                    <span>{reference.journal}</span>
                  </>
                )}
                {reference.volume && <span>Vol. {reference.volume}</span>}
                {reference.page && <span>pp. {reference.page}</span>}
              </div>
            </div>
          </li>
        ))}
      </aside>
    </div>
  );
};
