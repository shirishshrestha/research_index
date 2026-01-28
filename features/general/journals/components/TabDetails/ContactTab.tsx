"use client";

import { Card } from "@/components/ui/card";
import type { JournalDetail } from "../../api/journals.server";

interface ContactDetail {
  label: string;
  value: string;
}

interface ContactTabProps {
  journal: JournalDetail;
}

function DetailRow({ label, value }: ContactDetail) {
  if (!value || value === "N/A") return null;

  return (
    <div className="flex gap-2 text-base">
      <span className="font-semibold min-w-fit">{label}:</span>
      <span className="sub-body">{value}</span>
    </div>
  );
}

export function ContactTab({ journal }: ContactTabProps) {
  const journalDetails = [
    { label: "English Title", value: journal.title },
    { label: "Short Title", value: journal.short_title },
    { label: "ISSN", value: journal.issn },
    { label: "E-ISSN", value: journal.e_issn },
    { label: "Language", value: journal.language },
    { label: "Publication Frequency", value: journal.frequency_display },
    {
      label: "Established Year",
      value: journal.established_year?.toString() || "N/A",
    },
    { label: "Open Access", value: journal.is_open_access ? "Yes" : "No" },
    { label: "Peer Reviewed", value: journal.peer_reviewed ? "Yes" : "No" },
  ];

  const contactDetails = [
    { label: "Email", value: journal.contact_email || "N/A" },
    { label: "Phone", value: journal.contact_phone || "N/A" },
    { label: "Address", value: journal.contact_address || "N/A" },
    { label: "Website", value: journal.website || "N/A" },
  ];

  const publisherDetails = [
    {
      label: "Publisher",
      value: journal.publisher_name || journal.institution_name,
    },
    { label: "Institution", value: journal.institution_name },
  ];

  return (
    <div className="space-y-6.25 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6.25">
      {/* Journal Details */}
      <Card className="p-6.25 shadow-none gap-0 bg-blue-02 border-none rounded-md">
        <h3 className="heading-4 text-lg! text-text-black mb-3.75">
          Journal Details
        </h3>
        <div className="space-y-2">
          {journalDetails.map((field) => (
            <DetailRow
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>
      </Card>

      <div>
        {/* Contact Details */}
        <Card className="p-5 shadow-none gap-6.25 rounded-md">
          <div>
            <h3 className="heading-4 text-lg! text-text-black mb-3.75">
              Contact Information
            </h3>
            <div className="space-y-2">
              {contactDetails.map((field) => (
                <DetailRow
                  key={field.label}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>
          </div>

          {/* Publisher Details */}
          <div>
            <h3 className="heading-4  text-lg! text-text-black mb-3.75">
              Publisher Details
            </h3>
            <div className="space-y-2">
              {publisherDetails.map((field) => (
                <DetailRow
                  key={field.label}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
