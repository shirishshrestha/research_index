"use client";

import { ProfileTabs } from "@/features/shared/components/profile";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared";
import { ChevronDown } from "lucide-react";
import {
  CitationsTab,
  OverviewTab,
  ReferencesTab,
  SimilarArticlesTab,
  StatsTab,
} from "./TabDetails";
import type { Publication } from "@/features/panel/author/publications/types";

interface ArticleDetailsProps {
  article: Publication;
}

export function ArticleDetails({ article }: ArticleDetailsProps) {
  // Format authors list
  const authors = article.co_authors
    ? article.co_authors.split(",").map((a) => a.trim())
    : [article.author_name || ""];

  return (
    <div className="section-padding pt-0!">
      {/* Article Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="heading-4 mb-1.25 text-text-black">{article.title}</h1>
          <p className="sub-body italic! mb-2.5">{authors.join(", ")}</p>
          <div className="flex flex-col flex-wrap gap-0.5 ">
            {article.doi && <p className="desc">DOI: {article.doi}</p>}
            {article.pubmed_id && (
              <p className="desc">PMID: {article.pubmed_id}</p>
            )}
            {article.published_date && (
              <p className="desc">
                Published at:{" "}
                {new Date(article.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
        {article.pdf_url && (
          <Button
            variant={"ghost"}
            className="p-0 leading-normal hover:bg-transparent! hover:text-primary"
            onClick={() => window.open(article.pdf_url, "_blank")}
          >
            <Icon name="pdf" size={20} className="mr-2" />
            View Full PDF
          </Button>
        )}
      </div>

      {/* Tabs */}
      <ProfileTabs
        tabs={[
          {
            label: "Overview",
            value: "overview",
            content: <OverviewTab article={article} />,
          },
          {
            label: "Stats",
            value: "stats",
            content: <StatsTab article={article} />,
          },
          {
            label: "Citations",
            value: "citations",
            content: <CitationsTab />,
          },
          {
            label: "References",
            value: "references",
            content: <ReferencesTab />,
          },
          {
            label: "Similar Articles",
            value: "similar-articles",
            content: <SimilarArticlesTab />,
          },
        ]}
        moreOptions={
          <div>
            <p className="flex items-center gap-1.5 heading-para">
              More <ChevronDown className="stroke-[1.6px]" size={18} />
            </p>
          </div>
        }
      />
    </div>
  );
}
