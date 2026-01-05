"use client";

import { Card } from "@/components/ui/card";

interface ContactDetail {
  label: string;
  value: string;
}

interface JournalDetailsData {
  englishTitle: string;
  originalTitle: string;
  shortTitle: string;
  printedVersion: string;
  electronicVersion: string;
  journalCharacter: string;
  publicationFrequency: string;
  circulation: string;
  firstIssueYear: string;
  freeFullText: string;
}

interface ContactInfo {
  location: string;
  tel: string;
  email: string;
  website: string;
}

interface ContactData {
  journalDetails: JournalDetailsData;
  editorialDetails: ContactInfo;
  publisherDetails: ContactInfo;
}

// Mock data - replace with props or API data later
const mockContactData: ContactData = {
  journalDetails: {
    englishTitle: "Journal of Himalayan Environmental Studies",
    originalTitle: "Himalayan Studies",
    shortTitle: "n/d",
    printedVersion: "No",
    electronicVersion: "Yes",
    journalCharacter: "naukowy",
    publicationFrequency: "n/d",
    circulation: "n/d",
    firstIssueYear: "2019",
    freeFullText: "PDF Available",
  },
  editorialDetails: {
    location: "Smart Cities Editorial Office, Grosspeteranlage 5, 4052 Basel",
    tel: "+977 9800000000",
    email: "cities@mdpi.com",
    website: "https://www.mdpi.com/journal/smartcities",
  },
  publisherDetails: {
    location: "MDPI AG, Grosspeteranlage 5, 4052 Basel",
    tel: "+977 9800000000",
    email: "indexing@mdpi.com",
    website: "https://www.mdpi.com",
  },
};

const journalDetailFields: { label: string; key: keyof JournalDetailsData }[] =
  [
    { label: "English title", key: "englishTitle" },
    { label: "Original title", key: "originalTitle" },
    { label: "Short title", key: "shortTitle" },
    { label: "Printed version", key: "printedVersion" },
    { label: "Electronic version", key: "electronicVersion" },
    { label: "Journal character", key: "journalCharacter" },
    { label: "Publication frequency", key: "publicationFrequency" },
    { label: "Circulation", key: "circulation" },
    { label: "First issue year", key: "firstIssueYear" },
    { label: "Free full text", key: "freeFullText" },
  ];

const contactFields: { label: string; key: keyof ContactInfo }[] = [
  { label: "Location", key: "location" },
  { label: "Tel", key: "tel" },
  { label: "Email", key: "email" },
  { label: "Website", key: "website" },
];

function DetailRow({ label, value }: ContactDetail) {
  return (
    <div className="flex gap-2 text-base">
      <span className="font-semibold min-w-fit">{label}:</span>
      <span className="sub-body">{value}</span>
    </div>
  );
}

export function ContactTab() {
  return (
    <div className="space-y-6.25 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6.25">
      {/* Journal Details */}
      <Card className="p-6.25 shadow-none gap-0 bg-blue-02 border-none rounded-md">
        <h3 className="heading-4 text-lg! text-text-black mb-3.75">
          Journal Details
        </h3>
        <div className="space-y-2">
          {journalDetailFields.map((field) => (
            <DetailRow
              key={field.key}
              label={field.label}
              value={mockContactData.journalDetails[field.key]}
            />
          ))}
        </div>
      </Card>

      <div>
        {/* Editorial Details */}
        <Card className="p-5 shadow-none gap-6.25 rounded-md">
          <div>
            <h3 className="heading-4 text-lg! text-text-black mb-3.75">
              Editorial Details
            </h3>
            <div className="space-y-2">
              {contactFields.map((field) => (
                <DetailRow
                  key={field.key}
                  label={field.label}
                  value={mockContactData.editorialDetails[field.key]}
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
              {contactFields.map((field) => (
                <DetailRow
                  key={field.key}
                  label={field.label}
                  value={mockContactData.publisherDetails[field.key]}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
