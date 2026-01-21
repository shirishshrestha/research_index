"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import DataTable, {
  type DataTableColumn,
} from "@/features/shared/components/DataTable";
import type { EditorialBoardMember } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface JournalEditorialBoardProps {
  members: EditorialBoardMember[];
}

export function JournalEditorialBoard({ members }: JournalEditorialBoardProps) {
  const columns: DataTableColumn<EditorialBoardMember>[] = [
    {
      key: "member",
      header: "Member",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.photo_url} alt={row.name} />
            <AvatarFallback>
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            {row.title && (
              <p className="text-xs text-muted-foreground">{row.title}</p>
            )}
          </div>
        </div>
      ),
      cellClassName: "min-w-[200px]",
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge variant="secondary">{row.role_display || row.role}</Badge>
      ),
    },
    {
      key: "affiliation",
      header: "Affiliation",
      accessor: (row) => row.affiliation || "N/A",
      cellClassName: "max-w-xs truncate",
    },
    {
      key: "expertise",
      header: "Expertise",
      accessor: (row) => row.expertise || "-",
      cellClassName: "max-w-xs truncate",
    },
    {
      key: "links",
      header: "Links",
      align: "center",
      render: (row) => (
        <div className="flex items-center gap-2 justify-center">
          {row.orcid && (
            <a
              href={`https://orcid.org/${row.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs"
              title="ORCID Profile"
            >
              ORCID
            </a>
          )}
          {row.website && (
            <a
              href={row.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
              title="Website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {!row.orcid && !row.website && (
            <span className="text-muted-foreground text-xs">-</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 heading-4 text-primary!">
            <Users className="h-5 w-5" />
            Editorial Board
          </span>
          <Badge variant="outline">{members.length} Members</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={members}
          columns={columns}
          emptyMessage="No editorial board members added yet"
          hoverable
        />
      </CardContent>
    </Card>
  );
}
