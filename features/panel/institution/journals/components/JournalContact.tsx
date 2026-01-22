import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { Journal } from "../types";

interface JournalContactProps {
  journal?: Journal;
  isPending?: boolean;
}

export function JournalContact({ journal, isPending }: JournalContactProps) {
  if (isPending) {
    return (
      <Card className="gap-3">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-4 w-4 mt-0.5" />
              <div className="flex-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!journal) {
    return null;
  }
  const hasContactInfo =
    journal.contact_email ||
    journal.contact_phone ||
    journal.contact_address ||
    journal.website;

  if (!hasContactInfo) {
    return (
      <Card className="gap-3">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No contact information available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {journal.contact_email && (
          <ContactItem
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={
              <a
                href={`mailto:${journal.contact_email}`}
                className="text-primary hover:underline"
              >
                {journal.contact_email}
              </a>
            }
          />
        )}

        {journal.contact_phone && (
          <ContactItem
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={
              <a
                href={`tel:${journal.contact_phone}`}
                className="text-primary hover:underline"
              >
                {journal.contact_phone}
              </a>
            }
          />
        )}

        {journal.website && (
          <ContactItem
            icon={<Globe className="h-4 w-4" />}
            label="Website"
            value={
              <a
                href={journal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {journal.website}
              </a>
            }
          />
        )}

        {journal.contact_address && (
          <ContactItem
            icon={<MapPin className="h-4 w-4" />}
            label="Address"
            value={<span className="text-sm">{journal.contact_address}</span>}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function ContactItem({ icon, label, value }: ContactItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-muted-foreground mb-0.5">
          {label}
        </h3>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}
