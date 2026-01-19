import { JournalProfileCard } from "./JournalProfileCard";
import { ProfileTabs } from "@/features/shared/components/profile";
import { ChevronDown } from "lucide-react";
import {
  JournalOverviewTab,
  LatestIssuesTab,
  AllIssuesTab,
  LinkedDatasetsTab,
  EditorialBoard,
  ContactTab,
} from "./TabDetails";
import type { JournalDetails as JournalDetailsType } from "../types";

interface JournalDetailsProps {
  journal?: any; // Accept journal data from server
}

export function JournalDetails({
  journal: serverJournal,
}: JournalDetailsProps) {
  // Use server data if available, otherwise use mock data
  const journal: JournalDetailsType = serverJournal || {
    title: "Journal of Himalayan Environmental Studies",
    institution: "Nepal Academy of Science and Technology (NAST)",
    issn: "2789-4536",
    doiPrefix: "10.58291",
    license: "CC BY-NC-SA 4.0",
    badge: { label: "ICV 2024", value: "171.50" },
  };

  return (
    <div className="section-padding pt-0!">
      {/* Journal Profile Card */}
      <div className="space-y-8 mb-8 flex justify-between items-start">
        <JournalProfileCard journal={journal} />
        {/* Badge */}
        {journal?.badge && (
          <div className="shrink-0 bg-secondary w-fit text-white px-3.75 py-3 rounded-md flex items-center gap-2">
            <span className="text-base font-semibold leading-none">
              {journal?.badge.label}
            </span>
            <span className="text-lg font-bold font-merriweather leading-none text-text-black">
              {journal?.badge.value}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <ProfileTabs
        tabs={[
          {
            label: "Overview",
            value: "overview",
            content: <JournalOverviewTab />,
          },
          {
            label: "Editorial Board",
            value: "editorial-board",
            content: <EditorialBoard />,
          },
          {
            label: "Articles and Issues",
            value: "articles-issues",
            content: <></>,
            dropdown: [
              {
                label: "Latest Issues",
                value: "latest-issues",
                content: <LatestIssuesTab />,
              },
              {
                label: "All Issues",
                value: "all-issues",
                content: <AllIssuesTab />,
              },
              {
                label: "Linked Datasets",
                value: "linked-datasets",
                content: <LinkedDatasetsTab />,
              },
            ],
          },
          {
            label: "Stats",
            value: "stats",
            content: (
              <div className="text-center py-16">
                <p className="text-text-gray">
                  Journal statistics will be displayed here
                </p>
              </div>
            ),
          },
          {
            label: "Contact",
            value: "contact",
            content: <ContactTab />,
          },
        ]}
        moreOptions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 heading-para hover:text-primary transition-colors">
              Export <ChevronDown className="stroke-[1.6px]" size={18} />
            </button>
            <button className="flex items-center gap-1.5 heading-para hover:text-primary transition-colors">
              Share <ChevronDown className="stroke-[1.6px]" size={18} />
            </button>
            <button className="flex items-center gap-1.5 heading-para hover:text-primary transition-colors">
              More <ChevronDown className="stroke-[1.6px]" size={18} />
            </button>
          </div>
        }
      />
    </div>
  );
}
