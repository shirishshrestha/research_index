"use client";

import { TopicCard } from "@/components/shared";
import { useTopicTreeQuery } from "../hooks";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { TopicTree } from "../types";

interface TopicsListViewProps {
  initialTopics: TopicTree;
}

export function TopicsListView({ initialTopics }: TopicsListViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Only fetch when searching (client-side filtering for now)
  // Server component handles initial load
  const { data: searchedTopics, isLoading } = useTopicTreeQuery(searchTerm, {
    enabled: searchTerm.length > 0,
  });

  // Use searched topics if available, otherwise use initial
  const topics = searchTerm ? searchedTopics : initialTopics;

  return (
    <div className="pt-12.5! section-padding">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <h2 className="heading-3 text-text-black">
            All Topics ({topics?.length || 0})
          </h2>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray w-4 h-4" />
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Topics Grid */}
      {!isLoading && topics && topics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              label={topic.name}
              count={topic.publications_count}
              href={`/topics/${topic.id}`}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && topics && topics.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-gray text-lg">
            {searchTerm
              ? `No topics found matching "${searchTerm}"`
              : "No topics available"}
          </p>
        </div>
      )}
    </div>
  );
}
