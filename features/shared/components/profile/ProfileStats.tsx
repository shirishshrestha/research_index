import { Card } from "@/components/ui/card";
import { ProfileStatsProps } from "./types";

export function ProfileStats({
  hIndex,
  iIndex,
  citations,
  publications,
  reads,
  downloads,
  className = "",
}: ProfileStatsProps) {
  const stats = [
    { label: "h-index", value: hIndex, description: "Research impact metric" },
    {
      label: "i-index",
      value: iIndex,
      description: "Papers with 10+ citations",
    },
    {
      label: "Citations",
      value: citations.toLocaleString(),
      description: "Total citations",
    },
  ];

  // Add optional stats if provided
  if (publications !== undefined) {
    stats.push({
      label: "Publications",
      value: publications.toLocaleString(),
      description: "Total publications",
    });
  }
  if (reads !== undefined) {
    stats.push({
      label: "Reads",
      value: reads.toLocaleString(),
      description: "Total reads",
    });
  }
  if (downloads !== undefined) {
    stats.push({
      label: "Downloads",
      value: downloads.toLocaleString(),
      description: "Total downloads",
    });
  }

  return (
    <div
      className={`grid flex-1 grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}
    >
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4.5 h-fit flex rounded-md flex-col justify-center shadow-none duration-200 gap-0"
          title={stat.description}
        >
          <h3 className="heading-3">{stat.value}</h3>
          <span className="para pt-2">{stat.label}</span>
        </Card>
      ))}
    </div>
  );
}
