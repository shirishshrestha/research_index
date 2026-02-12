"use client";

import { useState, useMemo } from "react";
import type { EditorialBoardMember } from "../../api/journals.server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Mail, Globe } from "lucide-react";

interface EditorialBoardProps {
  editorialBoard: EditorialBoardMember[];
}

export const EditorialBoard = ({ editorialBoard }: EditorialBoardProps) => {
  const [selectedMember, setSelectedMember] =
    useState<EditorialBoardMember | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Group members by role
  const groupedMembers = useMemo(() => {
    const groups: Record<string, EditorialBoardMember[]> = {};
    editorialBoard.forEach((member) => {
      const role = member.role_display || member.role;
      if (!groups[role]) {
        groups[role] = [];
      }
      groups[role].push(member);
    });
    return groups;
  }, [editorialBoard]);

  const handleViewDetails = (member: EditorialBoardMember) => {
    setSelectedMember(member);
    setDetailsOpen(true);
  };

  if (!editorialBoard || editorialBoard.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-gray">No editorial board members listed yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {Object.entries(groupedMembers).map(([role, members]) => (
          <div key={role} className="space-y-4">
            <h3 className="font-semibold text-xl text-text-black">{role}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3"></div>
                        <Avatar className="h-32 w-32 border-4 border-primary/20 relative">
                          <AvatarImage
                            src={member.photo_url}
                            alt={member.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-2xl bg-primary/5">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg text-text-black leading-tight">
                        {member.title && (
                          <span className="text-muted-foreground text-sm mr-1">
                            {member.title}
                          </span>
                        )}
                        {member.name}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {member.role_display || member.role}
                      </Badge>
                      {member.affiliation && (
                        <p className="text-sm text-muted-foreground leading-snug">
                          {member.affiliation}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewDetails(member)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Member Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedMember?.photo_url} />
                <AvatarFallback>
                  {selectedMember?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl font-semibold">
                  {selectedMember?.title && (
                    <span className="text-muted-foreground text-base mr-2">
                      {selectedMember.title}
                    </span>
                  )}
                  {selectedMember?.name}
                </div>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-primary/10 text-primary"
                >
                  {selectedMember?.role_display || selectedMember?.role}
                </Badge>
              </div>
            </DialogTitle>
            {selectedMember?.affiliation && (
              <DialogDescription className="text-base">
                {selectedMember.affiliation}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedMember?.bio && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  Biography
                </h4>
                <p className="text-sm leading-relaxed">{selectedMember.bio}</p>
              </div>
            )}

            {selectedMember?.expertise && (
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                  Areas of Expertise
                </h4>
                <p className="text-sm leading-relaxed">
                  {selectedMember.expertise}
                </p>
              </div>
            )}

            {/* Contact & Links */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                Contact & Links
              </h4>
              <div className="space-y-2">
                {selectedMember?.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedMember.email}
                  </a>
                )}
                {selectedMember?.orcid && (
                  <a
                    href={`https://orcid.org/${selectedMember.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    ORCID: {selectedMember.orcid}
                  </a>
                )}
                {selectedMember?.website && (
                  <a
                    href={selectedMember.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    Personal Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
