"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Edit,
  Eye,
  FileText,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import type { JournalListItem } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournal } from "../api";
import { toast } from "sonner";

interface JournalCardProps {
  journal: JournalListItem;
}

export function JournalCard({ journal }: JournalCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteJournal(journal.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success("Journal deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete journal");
    },
  });

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${journal.title}"? This action cannot be undone.`,
      )
    ) {
      deleteMutation.mutate();
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {/* Cover Image */}
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5">
          {journal.cover_image_url ? (
            <img
              src={journal.cover_image_url}
              alt={journal.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <BookOpen className="h-16 w-16 text-primary/30" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant={journal.is_active ? "default" : "secondary"}>
              {journal.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Actions Menu */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/institution/journals/${journal.id}`)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/institution/journals/${journal.id}/edit`)
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Journal
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/institution/journals/${journal.id}/questionnaire`,
                    )
                  }
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Questionnaire
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Journal
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <Link href={`/institution/journals/${journal.id}`}>
          <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors mb-2">
            {journal.title}
          </h3>
        </Link>

        {journal.short_title && (
          <p className="text-sm text-text-gray mb-2">{journal.short_title}</p>
        )}

        <p className="text-sm text-text-gray line-clamp-2 mb-3">
          {journal.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-3">
          {journal.issn && (
            <Badge variant="outline" className="text-xs">
              ISSN: {journal.issn}
            </Badge>
          )}
          {journal.is_open_access && (
            <Badge
              variant="outline"
              className="text-xs bg-green-50 text-green-700 border-green-200"
            >
              Open Access
            </Badge>
          )}
          {journal.peer_reviewed && (
            <Badge variant="outline" className="text-xs">
              Peer Reviewed
            </Badge>
          )}
        </div>

        {/* Stats */}
        {journal.stats && (
          <div className="grid grid-cols-2 gap-2 text-xs text-text-gray">
            <div>
              <span className="font-semibold">Impact Factor:</span>{" "}
              {journal.stats.impact_factor || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Articles:</span>{" "}
              {journal.stats.total_articles}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-xs text-text-gray">
          {journal.editorial_board_count} editors • {journal.issues_count}{" "}
          issues
        </div>
        <Link href={`/institution/journals/${journal.id}`}>
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
