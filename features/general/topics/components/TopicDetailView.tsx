"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, CheckCircle2, Info, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topic, TopicBranch, TopicDetailViewProps } from "../types";

// Mock data based on the API documentation
const mockTopicData: Record<string, Topic> = {
  7: {
    id: 1,
    name: "Technology",
    slug: "technology",
    description: "Research in computing, algorithms, AI, and related fields",
    icon: "💻",
    branches: [
      {
        id: 1,
        name: "Information Technology",
        slug: "information-technology",
        description: "IT infrastructure and systems",
        level: 1,
        full_path: "Technology > Information Technology",
        children_count: 5,
        publications_count: 145,
        children: [
          {
            id: 2,
            name: "Computer Science",
            slug: "computer-science",
            description: "Computing theory and practice",
            level: 2,
            full_path: "Technology > Information Technology > Computer Science",
            children_count: 3,
            publications_count: 78,
            parent_id: 1,
            children: [
              {
                id: 3,
                name: "Artificial Intelligence",
                slug: "artificial-intelligence",
                description: "AI research and applications",
                level: 3,
                full_path:
                  "Technology > Information Technology > Computer Science > Artificial Intelligence",
                children_count: 2,
                publications_count: 45,
                parent_id: 2,
                children: [
                  {
                    id: 4,
                    name: "Machine Learning",
                    slug: "machine-learning",
                    description: "ML algorithms and techniques",
                    level: 4,
                    full_path: "Technology > IT > CS > AI > Machine Learning",
                    children_count: 0,
                    publications_count: 25,
                    parent_id: 3,
                  },
                  {
                    id: 5,
                    name: "Natural Language Processing",
                    slug: "natural-language-processing",
                    description: "NLP and text analysis",
                    level: 4,
                    full_path:
                      "Technology > IT > CS > AI > Natural Language Processing",
                    children_count: 0,
                    publications_count: 20,
                    parent_id: 3,
                  },
                ],
              },
              {
                id: 6,
                name: "Data Science",
                slug: "data-science",
                description: "Data analysis and visualization",
                level: 3,
                full_path:
                  "Technology > Information Technology > Computer Science > Data Science",
                children_count: 0,
                publications_count: 33,
                parent_id: 2,
              },
            ],
          },
          {
            id: 7,
            name: "Telecommunication",
            slug: "telecommunication",
            description: "Communication systems and networks",
            level: 2,
            full_path:
              "Technology > Information Technology > Telecommunication",
            children_count: 2,
            publications_count: 42,
            parent_id: 1,
            children: [
              {
                id: 8,
                name: "Telecommunication Theory",
                slug: "telecommunication-theory",
                description: "Theoretical foundations",
                level: 3,
                full_path: "Technology > IT > Telecommunication > Theory",
                children_count: 0,
                publications_count: 15,
                parent_id: 7,
              },
              {
                id: 9,
                name: "Tele-Transmission Theory",
                slug: "tele-transmission-theory",
                description: "Data transmission methods",
                level: 3,
                full_path:
                  "Technology > IT > Telecommunication > Tele-Transmission",
                children_count: 0,
                publications_count: 12,
                parent_id: 7,
              },
            ],
          },
          {
            id: 10,
            name: "Image Analysis",
            slug: "image-analysis",
            description: "Digital image processing",
            level: 2,
            full_path: "Technology > Information Technology > Image Analysis",
            children_count: 0,
            publications_count: 25,
            parent_id: 1,
          },
        ],
      },
      {
        id: 11,
        name: "Engineering Physics",
        slug: "engineering-physics",
        description: "Applied physics in engineering",
        level: 1,
        full_path: "Technology > Engineering Physics",
        children_count: 0,
        publications_count: 88,
      },
      {
        id: 12,
        name: "Electrical Engineering, Electronics and Photonics",
        slug: "electrical-engineering",
        description: "Electrical systems and photonics",
        level: 1,
        full_path: "Technology > Electrical Engineering",
        children_count: 0,
        publications_count: 112,
      },
    ],
    branches_count: 12,
    publications_count: 533,
  },
  5: {
    id: 5,
    name: "Natural Sciences",
    slug: "natural-sciences",
    description: "Research in physics, chemistry, biology and earth sciences",
    icon: "🔬",
    branches: [
      {
        id: 20,
        name: "Biology",
        slug: "biology",
        description: "Life sciences and biological research",
        level: 1,
        full_path: "Natural Sciences > Biology",
        children_count: 2,
        publications_count: 245,
        children: [
          {
            id: 21,
            name: "Molecular Biology",
            slug: "molecular-biology",
            description: "Study of biological activity at molecular level",
            level: 2,
            full_path: "Natural Sciences > Biology > Molecular Biology",
            children_count: 0,
            publications_count: 120,
            parent_id: 20,
          },
          {
            id: 22,
            name: "Ecology",
            slug: "ecology",
            description: "Study of organisms and their environment",
            level: 2,
            full_path: "Natural Sciences > Biology > Ecology",
            children_count: 0,
            publications_count: 125,
            parent_id: 20,
          },
        ],
      },
      {
        id: 23,
        name: "Physics",
        slug: "physics",
        description: "Study of matter, energy and fundamental forces",
        level: 1,
        full_path: "Natural Sciences > Physics",
        children_count: 0,
        publications_count: 312,
      },
      {
        id: 24,
        name: "Chemistry",
        slug: "chemistry",
        description: "Study of substances and their properties",
        level: 1,
        full_path: "Natural Sciences > Chemistry",
        children_count: 0,
        publications_count: 255,
      },
    ],
    branches_count: 5,
    publications_count: 812,
  },
  3: {
    id: 3,
    name: "Social Sciences",
    slug: "social-sciences",
    description: "Study of society and human behavior",
    icon: "👥",
    branches: [
      {
        id: 30,
        name: "Sociology",
        slug: "sociology",
        description: "Study of social behavior and society",
        level: 1,
        full_path: "Social Sciences > Sociology",
        children_count: 0,
        publications_count: 180,
      },
      {
        id: 31,
        name: "Psychology",
        slug: "psychology",
        description: "Study of mind and behavior",
        level: 1,
        full_path: "Social Sciences > Psychology",
        children_count: 1,
        publications_count: 220,
        children: [
          {
            id: 32,
            name: "Clinical Psychology",
            slug: "clinical-psychology",
            description: "Assessment and treatment of mental illness",
            level: 2,
            full_path: "Social Sciences > Psychology > Clinical Psychology",
            children_count: 0,
            publications_count: 98,
            parent_id: 31,
          },
        ],
      },
      {
        id: 33,
        name: "Economics",
        slug: "economics",
        description: "Study of production, distribution and consumption",
        level: 1,
        full_path: "Social Sciences > Economics",
        children_count: 0,
        publications_count: 280,
      },
    ],
    branches_count: 4,
    publications_count: 680,
  },
};

export function TopicDetailView({ topicId }: TopicDetailViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<TopicBranch | null>(
    null
  );
  const [expandedBranches, setExpandedBranches] = useState<Set<number>>(
    new Set([1])
  );
  const router = useRouter();

  // Get topic data (mock for now)
  const topicData = mockTopicData[topicId];

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
