"use client";

import { TopicCard } from "@/components/shared";

export const mockTopics = [
  {
    id: "hum",
    label: "Humanities and Religion",
    count: 742,
  },
  {
    id: "law",
    label: "Law / Jurisprudence",
    count: 215,
  },
  {
    id: "soc",
    label: "Social Sciences",
    count: 680,
  },
  {
    id: "math",
    label: "Mathematics",
    count: 194,
  },
  {
    id: "nat",
    label: "Natural Sciences",
    count: 812,
  },
  {
    id: "tech",
    label: "Technology",
    count: 533,
  },
  {
    id: "agri",
    label: "Forestry, Agricultural Sciences & Landscape Planning",
    count: 380,
  },
  {
    id: "med",
    label: "Medicine",
    count: 421,
  },
  {
    id: "dent",
    label: "Odontology",
    count: 98,
  },
  {
    id: "pharm",
    label: "Pharmacy",
    count: 167,
  },
  {
    id: "vet",
    label: "Veterinary Medicine",
    count: 143,
  },
  {
    id: "inter",
    label: "Interdisciplinary Research Areas",
    count: 256,
  },
];

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
