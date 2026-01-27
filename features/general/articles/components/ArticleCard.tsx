import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/shared";
import type { Publication } from "../types";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  publication: Publication;
}

export function ArticleCard({ publication }: ArticleCardProps) {
  // Format published date
  const formattedDate = publication.published_date
    ? new Date(publication.published_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  // Get author name(s)
  const authorNames = publication.co_authors
    ? `${publication.author_name}, ${publication.co_authors}`
    : publication.author_name;

  return (
    <Link href={`/articles/${publication.id}`}>
      <Card className="p-6.25 group hover:shadow-md duration-300 transition-shadow shadow-none">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between">
                {" "}
                <h4 className="heading-4 mb-2 text-primary group-hover:underline">
                  {publication.title}
                </h4>
                <div className="flex items-center gap-2 text-text-gray">
                  <Eye size={18} />
                  <span className="text-base">
                    {publication.stats?.reads_count || 0} reads
                  </span>
                </div>
              </div>
              <p className="para mb-1 line-clamp-1">{authorNames}</p>
              <div className="flex flex-wrap gap-1">
                <p className="desc text-base italic! mb-1.25">
                  Published: {formattedDate}
                </p>
                {publication.journal_title && (
                  <>
                    <span className="desc text-base">&nbsp;·&nbsp;</span>
                    <p className="desc text-base italic!">
                      {publication.journal_title}
                    </p>
                  </>
                )}
                {publication.doi && (
                  <>
                    <span className="desc text-base">&nbsp;·&nbsp;</span>
                    <p className="desc text-base">DOI: {publication.doi}</p>
                  </>
                )}
              </div>
            </div>

            {/* Citation Badge */}
            {publication.stats && publication.stats.citations_count > 0 && (
              <span className="text-base font-medium text-text-black whitespace-nowrap">
                {publication.stats.citations_count} Cite
              </span>
            )}
          </div>

          {/* Article Actions */}
          <div className="flex items-center gap-4">
            {publication.pdf_url && (
              <Button
                variant={"ghost"}
                className="flex px-2 hover:bg-transparent hover:border! hover:border-border border-transparent items-center gap-2"
                onClick={() => window.open(publication.pdf_url, "_blank")}
              >
                <Icon name="pdf" size={24} />
                <span className="text-base font-medium text-primary">
                  View PDF
                </span>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
