"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, CheckCircle2, Info, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TopicBranch, TopicDetailViewProps } from "../types";
import { useTopicTreeQuery } from "../hooks";

export function TopicDetailView({ topicId }: TopicDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<TopicBranch | null>(
    null
  );
  const [expandedBranches, setExpandedBranches] = useState<Set<number>>(
    new Set()
  );
  const router = useRouter();

  // Fetch topics tree data
  const { data: topicsTree, isLoading, error } = useTopicTreeQuery();

  // Find the specific topic from the tree
  const topicData = topicsTree?.find(
    (topic) => topic.id.toString() === topicId
  );

  if (isLoading) {
    return (
      <div className="section-padding py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-text-gray">Loading topic details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding py-20 text-center">
        <h2 className="heading-3 text-text-black mb-4">Error Loading Topic</h2>
        <p className="text-red-500">
          Failed to load topic details. Please try again later.
        </p>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="section-padding py-20 text-center">
        <h2 className="heading-3 text-text-black mb-4">Topic Not Found</h2>
        <p className="text-text-gray">
          The requested topic could not be found.
        </p>
      </div>
    );
  }

  const toggleBranch = (branchId: number) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branchId)) {
      newExpanded.delete(branchId);
    } else {
      newExpanded.add(branchId);
    }
    setExpandedBranches(newExpanded);
  };

  const handleBranchSelect = (branch: TopicBranch | null) => {
    setSelectedBranch(branch);
  };

  const handleBrowse = () => {
    if (selectedBranch) {
      // Navigate to publications page filtered by this branch
      router.push(
        `/articles?topic=${topicData.id}&branch=${selectedBranch.id}`
      );
    } else {
      // Navigate to publications page filtered by main topic
      router.push(`/articles?topic=${topicData.id}`);
    }
  };

  const renderBranch = (branch: TopicBranch) => {
    const isSelected = selectedBranch?.id === branch.id;
    const hasChildren = branch.children && branch.children.length > 0;

    if (hasChildren) {
      return (
        <AccordionItem
          key={branch.id}
          value={`branch-${branch.id}`}
          className="border-0 w-full"
        >
          <div
            className={`grid grid-cols-[1.63rem_1fr] items-center w-full! gap-3 transition-all ${
              isSelected ? "bg-blue-50" : ""
            }`}
            style={{ paddingLeft: `${(branch.level - 1) * 2 + 0.75}rem` }}
          >
            {/* Checkbox - only for selection */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleBranchSelect(isSelected ? null : branch);
              }}
              className="shrink-0 cursor-pointer z-10"
            >
              {isSelected ? (
                <CheckCircle2 className="w-5 h-5 text-primary fill-blue-100" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-400 transition-colors" />
              )}
            </div>

            {/* Accordion Trigger - for expand/collapse */}
            <AccordionTrigger
              className=" w-full! font-roboto! py-2.5 pr-3 hover:no-underline hover:bg-gray-50"
              onClick={() => toggleBranch(branch.id)}
            >
              <div className="flex items-center justify-between w-full!">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium text-[15px] ${
                      isSelected ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {branch.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({branch.publications_count})
                  </span>
                </div>
                <span className="text-xs px-2 font-normal py-0.5 rounded-full bg-gray-100 text-gray-600 ml-2">
                  Level {branch.level}
                </span>
              </div>
            </AccordionTrigger>
          </div>

          <AccordionContent className="pb-0 w-full!">
            {branch.children!.map((child) => renderBranch(child))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    // Leaf node without children
    return (
      <div key={branch.id}>
        <div
          className={`flex items-center gap-0.5 py-2.5 px-3 transition-all hover:bg-gray-50 ${
            isSelected ? "bg-blue-50" : ""
          }`}
          style={{ paddingLeft: `${(branch.level - 1) * 2 + 0.75}rem` }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleBranchSelect(isSelected ? null : branch);
            }}
            className="shrink-0 cursor-pointer"
          >
            {isSelected ? (
              <CheckCircle2 className="w-5 h-5 text-primary font-merriweather fill-blue-100" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-400 transition-colors" />
            )}
          </div>

          {/* Empty space for alignment */}
          <div className="w-4" />

          {/* Branch Content */}
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`font-medium text-[15px] ${
                  isSelected ? "text-primary" : "text-gray-900"
                }`}
              >
                {branch.name}
              </span>
              <span className="text-sm text-gray-500">
                ({branch.publications_count})
              </span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              Level {branch.level}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const filteredBranches = topicData.branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="section-padding pt-12.5!">
      {/* Topic Header */}
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1">
            <h1 className="heading-2 text-primary! mb-2">{topicData.name}</h1>
            <p className="heading-para mb-3">{topicData.description}</p>
            <div className="flex gap-4 text-sm text-text-gray">
              <span>
                <strong>{topicData.branches_count}</strong> branches
              </span>
              <span>
                <strong>{topicData.publications_count}</strong> publications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search topics....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full h-12 text-base"
          />
        </div>
      </div>

      {/* Selected Branch Info */}
      {selectedBranch && (
        <div className="mb-6 p-4 border border-blue-200 bg-blue-02 rounded-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  {selectedBranch.name}
                </h3>
              </div>
              <p className="text-sm text-primary pl-7">
                {selectedBranch.full_path}
              </p>
              {selectedBranch.description && (
                <p className="text-sm text-gray-600 pl-7 mt-1">
                  {selectedBranch.description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBranch(null)}
              className="text-primary hover:text-blue-900 hover:bg-blue-100"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Hierarchical Tree */}
      <div className=" rounded-lg border border-gray-200">
        <div className="flex items-center justify-between px-6 py-3 border-b mb-1">
          <h2 className="text-xl font-semibold text-gray-900">
            All Topics
            <span className="text-gray-500">({filteredBranches.length})</span>
          </h2>
        </div>

        {filteredBranches.length > 0 ? (
          <Accordion
            type="multiple"
            value={Array.from(expandedBranches).map((id) => `branch-${id}`)}
            className="w-full"
          >
            {filteredBranches.map((branch) => renderBranch(branch))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No topics found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Browse Button at Bottom */}
      <div className="mt-8">
        <Button
          onClick={handleBrowse}
          disabled={!selectedBranch}
          className="w-full sm:w-auto py-5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedBranch ? (
            <span className="flex items-center gap-2">
              Browse Publications
              <ArrowRight className="w-5 h-5" />
            </span>
          ) : (
            "Select a topic to browse publications"
          )}
        </Button>
        {selectedBranch && (
          <p className="text-sm text-gray-600 mt-3">
            You&apos;ll be directed to view{" "}
            <strong>{selectedBranch.publications_count}</strong> publications in{" "}
            <strong>{selectedBranch.name}</strong>
          </p>
        )}
      </div>

      {/* Enhanced How to Use Section */}
      <div className="mt-8 rounded-xl border border-blue-100 overflow-hidden bg-blue-02">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-primary">
              How to Use This Page
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-3 p-3 bg-white rounded-lg">
              <div className="shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-merriweather font-semibold text-sm">
                    1
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Select a Topic
                </h4>
                <p className="text-sm text-gray-600">
                  Click on the checkbox next to any topic to select it. You can
                  select topics at any level of the hierarchy.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-white rounded-lg">
              <div className="shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-merriweather font-semibold text-sm">
                    2
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Expand Categories
                </h4>
                <p className="text-sm text-gray-600">
                  Click the arrow icons to expand or collapse topic categories
                  and view sub-topics at deeper levels.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-white rounded-lg">
              <div className="shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-merriweather font-semibold text-sm">
                    3
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Search Topics
                </h4>
                <p className="text-sm text-gray-600">
                  Use the search bar above to quickly find specific topics by
                  name or keyword.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-white rounded-lg">
              <div className="shrink-0 mt-0.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-merriweather font-semibold text-sm">
                    4
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Browse Publications
                </h4>
                <p className="text-sm text-gray-600">
                  After selecting a topic, click the button below to view all
                  related research publications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
