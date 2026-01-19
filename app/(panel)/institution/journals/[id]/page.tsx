"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PanelContainer,
  PanelLoadingSkeleton,
  PanelErrorCard,
} from "@/features/shared";
import { getJournal } from "@/features/panel/institution/journals/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, BarChart3, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function JournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const journalId = parseInt(id);

  const {
    data: journal,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => getJournal(journalId),
  });

  if (isLoading) {
    return (
      <PanelContainer>
        <PanelLoadingSkeleton
          title="Loading Journal"
          description="Please wait while we load the journal details"
        />
      </PanelContainer>
    );
  }

  if (isError || !journal) {
    return (
      <PanelContainer>
        <PanelErrorCard
          title="Journal Not Found"
          description="The journal you're looking for doesn't exist."
        />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{journal.title}</h1>
          <p className="text-text-gray mt-1">{journal.short_title}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/institution/journals/${journal.id}/questionnaire`}>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Questionnaire
            </Button>
          </Link>
          <Link href={`/institution/journals/${journal.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Journal
            </Button>
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      {journal.cover_image_url && (
        <div className="relative h-64 rounded-lg overflow-hidden mb-6">
          <img
            src={journal.cover_image_url}
            alt={journal.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant={journal.is_active ? "default" : "secondary"}>
          {journal.is_active ? "Active" : "Inactive"}
        </Badge>
        {journal.is_open_access && (
          <Badge className="bg-green-100 text-green-800">Open Access</Badge>
        )}
        {journal.peer_reviewed && (
          <Badge variant="outline">Peer Reviewed</Badge>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-semibold">Description:</span>
              <p className="text-text-gray mt-1">{journal.description}</p>
            </div>
            {journal.scope && (
              <div>
                <span className="font-semibold">Scope:</span>
                <p className="text-text-gray mt-1">{journal.scope}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">ISSN:</span>
                <p className="text-text-gray">{journal.issn || "N/A"}</p>
              </div>
              <div>
                <span className="font-semibold">E-ISSN:</span>
                <p className="text-text-gray">{journal.e_issn || "N/A"}</p>
              </div>
              <div>
                <span className="font-semibold">Publisher:</span>
                <p className="text-text-gray">
                  {journal.publisher_name || "N/A"}
                </p>
              </div>
              <div>
                <span className="font-semibold">Frequency:</span>
                <p className="text-text-gray">{journal.frequency_display}</p>
              </div>
              <div>
                <span className="font-semibold">Established:</span>
                <p className="text-text-gray">
                  {journal.established_year || "N/A"}
                </p>
              </div>
              <div>
                <span className="font-semibold">Language:</span>
                <p className="text-text-gray">{journal.language}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {journal.stats ? (
              <>
                <div>
                  <span className="font-semibold">Impact Factor:</span>
                  <p className="text-2xl font-bold text-primary">
                    {journal.stats.impact_factor || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">CiteScore:</span>
                  <p className="text-xl">{journal.stats.cite_score || "N/A"}</p>
                </div>
                <div>
                  <span className="font-semibold">H-Index:</span>
                  <p className="text-xl">{journal.stats.h_index || "N/A"}</p>
                </div>
                <div>
                  <span className="font-semibold">Articles:</span>
                  <p className="text-xl">{journal.stats.total_articles}</p>
                </div>
                <div>
                  <span className="font-semibold">Issues:</span>
                  <p className="text-xl">{journal.stats.total_issues}</p>
                </div>
              </>
            ) : (
              <p className="text-text-gray">No statistics available</p>
            )}
          </CardContent>
        </Card>

        {/* Editorial Board */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Editorial Board ({journal.editorial_board.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {journal.editorial_board.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {journal.editorial_board.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-text-gray">
                      {member.role_display}
                    </p>
                    <p className="text-sm text-text-gray">
                      {member.affiliation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-gray">
                No editorial board members added yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-semibold">Email:</span>
              <p className="text-text-gray">{journal.contact_email || "N/A"}</p>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <p className="text-text-gray">{journal.contact_phone || "N/A"}</p>
            </div>
            <div>
              <span className="font-semibold">Website:</span>
              <p className="text-text-gray">
                {journal.website ? (
                  <a
                    href={journal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {journal.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            {journal.contact_address && (
              <div>
                <span className="font-semibold">Address:</span>
                <p className="text-text-gray">{journal.contact_address}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PanelContainer>
  );
}
