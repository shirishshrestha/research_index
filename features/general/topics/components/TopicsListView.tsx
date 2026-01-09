"use client";

import { TopicCard } from "@/components/shared";

export const mockTopics = [
  {
    id: 1,
    label: "Humanities and Religion",
    count: 742,
  },
  {
    id: 2,
    label: "Law / Jurisprudence",
    count: 215,
  },
  {
    id: 3,
    label: "Social Sciences",
    count: 680,
  },
  {
    id: 4,
    label: "Mathematics",
    count: 194,
  },
  {
    id: 5,
    label: "Natural Sciences",
    count: 812,
  },
  {
    id: 6,
    label: "Natural Sciences",
    count: 812,
  },
  {
    id: 7,
    label: "Technology",
    count: 533,
  },
  {
    id: 8,
    label: "Forestry, Agricultural Sciences & Landscape Planning",
    count: 380,
  },
  {
    id: 9,
    label: "Medicine",
    count: 421,
  },
  {
    id: 10,
    label: "Odontology",
    count: 98,
  },
  {
    id: 11,
    label: "Pharmacy",
    count: 167,
  },
  {
    id: 12,
    label: "Veterinary Medicine",
    count: 143,
  },
  {
    id: 13,
    label: "Interdisciplinary Research Areas",
    count: 256,
  },
];

// Note: Mock data for "tech" topic is available in TopicDetailView component

export function TopicsListView() {
  return (
    <div className="pt-12.5! section-padding">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <h2 className="heading-3 text-text-black">
            All Topics ({mockTopics.length})
          </h2>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {mockTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            label={topic.label}
            count={topic.count}
            href={`/topics/${topic.id}`}
          />
        ))}
      </div>

      {mockTopics.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-gray text-lg">
            No topics found matching &quot;&quot;
          </p>
        </div>
      )}
    </div>
  );
}
