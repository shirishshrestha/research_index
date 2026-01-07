"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JournalSidebarNav } from "../JournalSidebarNav";

interface Volume {
  volumeNumber: number;
  year: number;
  issues: {
    issueNumber: number;
    month: string;
    status?: string;
    articles: number;
  }[];
}

const volumesData: Volume[] = [
  {
    volumeNumber: 348,
    year: 2026,
    issues: [
      {
        issueNumber: 1,
        month: "January",
        status: "In progress",
        articles: 0,
      },
    ],
  },
  {
    volumeNumber: 347,
    year: 2025,
    issues: [
      { issueNumber: 12, month: "December", articles: 25 },
      { issueNumber: 11, month: "November", articles: 23 },
      { issueNumber: 10, month: "October", articles: 28 },
    ],
  },
  {
    volumeNumber: 346,
    year: 2025,
    issues: [
      { issueNumber: 9, month: "December", articles: 22 },
      { issueNumber: 8, month: "November", articles: 26 },
      { issueNumber: 7, month: "October", articles: 24 },
    ],
  },
  {
    volumeNumber: 345,
    year: 2025,
    issues: [
      { issueNumber: 6, month: "November", articles: 21 },
      { issueNumber: 5, month: "October", articles: 27 },
      { issueNumber: 4, month: "September", articles: 25 },
    ],
  },
  {
    volumeNumber: 344,
    year: 2025,
    issues: [
      { issueNumber: 3, month: "October", articles: 23 },
      { issueNumber: 2, month: "September", articles: 29 },
      { issueNumber: 1, month: "August", articles: 26 },
    ],
  },
  {
    volumeNumber: 330,
    year: 2025,
    issues: [
      { issueNumber: 4, month: "December", articles: 30 },
      { issueNumber: 3, month: "September", articles: 28 },
      { issueNumber: 2, month: "June", articles: 25 },
      { issueNumber: 1, month: "March", articles: 27 },
    ],
  },
  {
    volumeNumber: 329,
    year: 2024,
    issues: [
      { issueNumber: 4, month: "December", articles: 24 },
      { issueNumber: 3, month: "September", articles: 26 },
      { issueNumber: 2, month: "June", articles: 22 },
      { issueNumber: 1, month: "March", articles: 28 },
    ],
  },
  {
    volumeNumber: 312,
    year: 2024,
    issues: [
      { issueNumber: 4, month: "December", articles: 31 },
      { issueNumber: 3, month: "September", articles: 29 },
      { issueNumber: 2, month: "June", articles: 27 },
      { issueNumber: 1, month: "March", articles: 25 },
    ],
  },
  {
    volumeNumber: 311,
    year: 2023,
    issues: [
      { issueNumber: 4, month: "December", articles: 23 },
      { issueNumber: 3, month: "September", articles: 21 },
      { issueNumber: 2, month: "June", articles: 26 },
      { issueNumber: 1, month: "March", articles: 24 },
    ],
  },
  {
    volumeNumber: 294,
    year: 2023,
    issues: [
      { issueNumber: 4, month: "December", articles: 28 },
      { issueNumber: 3, month: "September", articles: 30 },
      { issueNumber: 2, month: "June", articles: 26 },
      { issueNumber: 1, month: "March", articles: 29 },
    ],
  },
];

// Generate publication years for sidebar
const publicationYears = Array.from(
  new Map(
    volumesData.map((vol) => [
      vol.year,
      {
        year: vol.year,
        volumeRange: volumesData
          .filter((v) => v.year === vol.year)
          .map((v) => v.volumeNumber)
          .sort((a, b) => a - b),
      },
    ])
  ).values()
).map(({ year, volumeRange }) => ({
  id: year.toString(),
  label: `${year} — Volume${volumeRange.length > 1 ? "s" : ""} ${Math.min(
    ...volumeRange
  )}-${Math.max(...volumeRange)}`,
  href: `#year-${year}`,
}));

export const AllIssuesTab = () => {
  const sections = [
    {
      title: "Publication Years",
      items: publicationYears,
    },
  ];

  // Group volumes by year
  const volumesByYear = volumesData.reduce((acc, volume) => {
    if (!acc[volume.year]) {
      acc[volume.year] = [];
    }
    acc[volume.year].push(volume);
    return acc;
  }, {} as Record<number, Volume[]>);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Left Sidebar - Publication Years */}
        <aside className="space-y-6">
          <JournalSidebarNav sections={sections} />
        </aside>

        {/* Right Content - Volumes Accordion */}
        <div className="space-y-8">
          <h2 className="heading-3 text-primary">All Issues</h2>

          {Object.entries(volumesByYear)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, volumes]) => (
              <div key={year} id={`year-${year}`} className="space-y-4">
                <h3 className="heading-4 text-primary">
                  {year} — Volume{volumes.length > 1 ? "s" : ""}{" "}
                  {Math.min(...volumes.map((v) => v.volumeNumber))}-
                  {Math.max(...volumes.map((v) => v.volumeNumber))}
                </h3>

                <Accordion type="multiple" className="space-y-3">
                  {volumes
                    .sort((a, b) => b.volumeNumber - a.volumeNumber)
                    .map((volume) => (
                      <AccordionItem
                        key={volume.volumeNumber}
                        value={`volume-${volume.volumeNumber}`}
                        className="border rounded-lg px-4 bg-white"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex flex-col items-start text-left">
                            <span className="sub-body text-primary!">
                              Volume {volume.volumeNumber}
                            </span>
                            <span className="sub-body text-text-gray">
                              {volume.issues[0]?.status || `${year}`}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <div className="space-y-3 mt-2">
                            {volume.issues.map((issue) => (
                              <div
                                key={issue.issueNumber}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <div>
                                  <p className="heading-para text-text-black">
                                    Volume {volume.volumeNumber}
                                  </p>
                                  <p className="sub-body text-text-gray">
                                    {issue.month} {volume.year}
                                    {issue.status && ` (${issue.status})`}
                                  </p>
                                </div>
                                <a
                                  href="#"
                                  className="text-primary hover:underline text-sm font-medium whitespace-nowrap"
                                >
                                  View issue →
                                </a>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
