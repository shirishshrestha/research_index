import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from "lucide-react";
import type { Journal } from "../types";

interface JournalBasicInfoProps {
  journal?: Journal;
  isPending?: boolean;
}

export function JournalBasicInfo({
  journal,
  isPending,
}: JournalBasicInfoProps) {
  if (isPending || !journal) {
    return (
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 heading-4 text-primary!">
            <Info className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 heading-4 text-primary!">
          <Info className="h-5 w-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {journal.description && (
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">
              Description
            </h3>
            <p className="text-sm">{journal.description}</p>
          </div>
        )}

        {journal.scope && (
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">
              Scope
            </h3>
            <p className="text-sm">{journal.scope}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <InfoItem label="Publisher" value={journal.publisher_name} />
          <InfoItem label="Frequency" value={journal.frequency_display} />
          <InfoItem
            label="Established"
            value={journal.established_year?.toString()}
          />
          <InfoItem label="Language" value={journal.language} />
          {journal.doi_prefix && (
            <InfoItem label="DOI Prefix" value={journal.doi_prefix} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  label: string;
  value?: string | null;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <h3 className="font-semibold text-sm text-muted-foreground mb-1">
        {label}
      </h3>
      <p className="text-sm">{value || "N/A"}</p>
    </div>
  );
}
