import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Journal } from "../types";

interface JournalHeaderProps {
  journal?: Journal;
  isPending?: boolean;
}

export function JournalHeader({ journal, isPending }: JournalHeaderProps) {
  if (isPending || !journal) {
    return (
      <Card className="overflow-hidden bg-transparent shadow-none pb-0 border-0">
        <div className="relative">
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Journal Logo/Avatar Skeleton */}
              <div className="shrink-0">
                <Skeleton className="h-32 w-32 rounded-xl" />
              </div>

              {/* Title and Info Skeleton */}
              <div className="flex-1 space-y-3 pt-2">
                <div>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2" />
                </div>

                {/* Status Badges Skeleton */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card className="overflow-hidden bg-transparent shadow-none pb-0 border-0">
      <div className="relative">
        {/* Cover Image Banner */}

        {/* Content Overlay */}
        <div className="relative ">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Journal Logo/Avatar */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-xl border-4 border-background bg-card  overflow-hidden">
                {journal.cover_image_url ? (
                  <img
                    src={journal.cover_image_url}
                    alt={journal.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <span className="heading-2 text-primary!">
                      {journal.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Title and Info */}
            <div className="flex-1 space-y-3 pt-2">
              <div>
                <h1 className="heading-2 text-primary!">{journal.title}</h1>
                {journal.short_title && (
                  <p className="text-muted-foreground text-lg">
                    {journal.short_title}
                  </p>
                )}
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={journal.is_active ? "default" : "secondary"}
                  className="px-3 py-1"
                >
                  {journal.is_active ? "Active" : "Inactive"}
                </Badge>
                {journal.is_open_access && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">
                    Open Access
                  </Badge>
                )}
                {journal.peer_reviewed && (
                  <Badge variant="outline" className="px-3 py-1">
                    Peer Reviewed
                  </Badge>
                )}
                {journal.issn && (
                  <Badge variant="outline" className="px-3 py-1">
                    ISSN: {journal.issn}
                  </Badge>
                )}
                {journal.e_issn && (
                  <Badge variant="outline" className="px-3 py-1">
                    E-ISSN: {journal.e_issn}
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Link href={`/institution/journals/${journal.id}/issues`}>
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Issues
                </Button>
              </Link>
              <Link href={`/institution/journals/${journal.id}/questionnaire`}>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Questionnaire
                </Button>
              </Link>
              <Link href={`/institution/journals/${journal.id}/edit`}>
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
