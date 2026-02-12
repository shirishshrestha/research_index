import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IssueListItem } from "../api/issues.server";
import { BookOpen, Calendar, FileText } from "lucide-react";

interface IssueCardProps {
  issue: IssueListItem;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Journal Title */}
          <Link
            href={`/journals/${issue.journal_id}`}
            className="text-sm text-primary hover:underline mb-1 block"
          >
            {issue.journal_title}
          </Link>

          {/* Volume and Issue */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg text-text-black">
              Vol. {issue.volume}, Issue {issue.issue_number}
            </h3>
            {issue.is_special_issue && (
              <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-white rounded">
                Special Issue
              </span>
            )}
          </div>

          {/* Issue Title */}
          {issue.title && (
            <p className="text-base text-text-black font-medium mb-2">
              {issue.title}
            </p>
          )}

          {/* Description */}
          {issue.description && (
            <p className="text-sm text-text-gray line-clamp-2 mb-3">
              {issue.description}
            </p>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-text-gray mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar size={16} />
          <span>
            {new Date(issue.publication_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText size={16} />
          <span>
            {issue.articles_count}{" "}
            {issue.articles_count === 1 ? "Article" : "Articles"}
          </span>
        </div>
      </div>

      {/* Articles Preview */}
      {issue.articles && issue.articles.length > 0 && (
        <div className="mt-auto pt-4 border-t">
          <h5 className="text-sm font-semibold text-text-black mb-2">
            Featured Articles:
          </h5>
          <div className="space-y-2">
            {issue.articles.slice(0, 2).map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.publication_id}`}
                className="block text-sm text-text-gray hover:text-primary transition-colors line-clamp-1"
              >
                {index + 1}. {article.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* View Issue Button */}
      <div className="mt-4">
        <Link href={`/journals/${issue.journal_id}/issues/${issue.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            <BookOpen size={16} className="mr-2" />
            View Issue
          </Button>
        </Link>
      </div>
    </Card>
  );
}
