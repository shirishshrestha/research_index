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
  StatsTab,
} from "./TabDetails";
import type { JournalDetail } from "../api/journals.server";

interface JournalDetailsProps {
  journal: JournalDetail;
}

export function JournalDetails({ journal }: JournalDetailsProps) {
  // Calculate badge value from stats
  const badgeValue =
    journal.stats?.impact_factor !== null &&
    journal.stats?.impact_factor !== undefined
      ? Number(journal?.stats?.impact_factor).toFixed(2)
      : "0.00";

  return (
    <div className="section-padding pt-0!">
      {/* Journal Profile Card */}
      <div className="space-y-8 mb-8 flex justify-between items-start">
        <JournalProfileCard journal={journal} />
        {/* Badge */}
        {journal.stats?.impact_factor && journal.stats.impact_factor > 0 && (
          <div className="shrink-0 bg-secondary w-fit text-white px-3.75 py-3 rounded-md flex items-center gap-2">
            <span className="text-base font-semibold leading-none">
              Impact Factor
            </span>
            <span className="text-lg font-bold font-merriweather leading-none text-text-black">
              {badgeValue}
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
            content: <JournalOverviewTab journal={journal} />,
          },
          {
            label: "Editorial Board",
            value: "editorial-board",
            content: (
              <EditorialBoard editorialBoard={journal.editorial_board} />
            ),
          },
          {
            label: "Articles and Issues",
            value: "articles-issues",
            content: <></>,
            dropdown: [
              {
                label: "Latest Issues",
                value: "latest-issues",
                content: <LatestIssuesTab journalId={journal.id} />,
              },
              {
                label: "All Issues",
                value: "all-issues",
                content: <AllIssuesTab journalId={journal.id} />,
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
              <StatsTab
                journalStats={{
                  total_articles: journal.stats?.total_publications || 0,
                  total_citations: journal.stats?.total_citations || 0,
                  total_issues: journal.stats?.total_issues || 0,
                  impact_factor:
                    journal.stats?.impact_factor?.toString() || "0.000",
                  cite_score: "0.000",
                  h_index: journal.stats?.h_index || 0,
                  acceptance_rate: "0.00",
                  average_review_time: 0,
                  recommendations: 0,
                }}
              />
            ),
          },
          {
            label: "Contact",
            value: "contact",
            content: <ContactTab journal={journal} />,
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
              </div>
        }
      />
    </div>
  );
}
