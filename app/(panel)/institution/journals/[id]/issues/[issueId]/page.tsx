"use client";

import { PanelContainer, PanelErrorCard } from "@/features/shared";
import { useIssueQuery } from "@/features/panel/institution/issues";
import { IssueBreadcrumb } from "@/features/panel/institution/issues/components/IssueBreadcrumb";
import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Calendar, FileText, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ISSUE_STATUS_VARIANTS } from "@/features/panel/institution/issues/constants";
import { Skeleton } from "@/components/ui/skeleton";

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string; issueId: string }>;
}) {
  const { id, issueId } = use(params);
  const router = useRouter();

  const { data: issue, isPending, isError } = useIssueQuery(id, issueId);

  if (isError) {
    return (
      <PanelErrorCard
        title="Issue Not Found"
        description="The requested issue could not be found"
      />
    );
  }

  if (isPending) {
    return (
      <PanelContainer>
        <IssueDetailSkeleton />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <div className="space-y-6">
        <IssueBreadcrumb
          journalId={id}
          issueId={issueId}
          currentPage="detail"
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Volume {issue.volume}, Issue {issue.issue_number}
            </h1>
            {issue.title && (
              <p className="text-lg text-text-gray mt-1">{issue.title}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={
                  ISSUE_STATUS_VARIANTS[
                    issue.status as keyof typeof ISSUE_STATUS_VARIANTS
                  ]
                }
              >
                {issue.status_display}
              </Badge>
              {issue.is_special_issue && (
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  Special Issue
                </Badge>
              )}
            </div>
          </div>
          <Button
            onClick={() =>
              router.push(`/institution/journals/${id}/issues/${issueId}/edit`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Issue
          </Button>
        </div>

        {/* Cover Image */}
        {issue.cover_image_url && (
          <Card>
            <CardContent className="p-0">
              <img
                src={issue.cover_image_url}
                alt={`Volume ${issue.volume} Issue ${issue.issue_number}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Issue Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Publication Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                {format(new Date(issue.publication_date), "MMMM dd, yyyy")}
              </p>
              {issue.submission_deadline && (
                <p className="text-sm text-muted-foreground mt-1">
                  Submission deadline:{" "}
                  {format(new Date(issue.submission_deadline), "MMM dd, yyyy")}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{issue.articles.length}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Total articles in this issue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {issue.doi && (
                <p className="text-sm">
                  <span className="font-medium">DOI:</span> {issue.doi}
                </p>
              )}
              {issue.pages_range && (
                <p className="text-sm">
                  <span className="font-medium">Pages:</span>{" "}
                  {issue.pages_range}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {issue.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {issue.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Editorial Note */}
        {issue.editorial_note && (
          <Card>
            <CardHeader>
              <CardTitle>Editorial Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {issue.editorial_note}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Guest Editors */}
        {issue.guest_editors && (
          <Card>
            <CardHeader>
              <CardTitle>Guest Editors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {issue.guest_editors}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Articles List */}
        <Card>
          <CardHeader>
            <CardTitle>Articles in this Issue</CardTitle>
          </CardHeader>
          <CardContent>
            {issue.articles.length > 0 ? (
              <div className="space-y-4">
                {issue.articles.map((article) => (
                  <div
                    key={article.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{article.article_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {article.article_authors}
                        </p>
                        {article.article_doi && (
                          <p className="text-xs text-muted-foreground mt-1">
                            DOI: {article.article_doi}
                          </p>
                        )}
                      </div>
                      {article.section && (
                        <Badge variant="outline">{article.section}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No articles added to this issue yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PanelContainer>
  );
}

function IssueDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-96" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}
