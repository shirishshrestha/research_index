"use client";

import { PanelContainer } from "@/features/shared";
import { TopicBranches } from "@/features/panel/admin/topics";
import { Breadcrumb } from "@/components/shared";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useTopicTreeQuery } from "@/features/general/topics";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function AdminTopicDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return <AdminTopicDetailClientComponent topicId={id} />;
}

function AdminTopicDetailClientComponent({ topicId }: { topicId: string }) {
  const { data: topicsTree, isLoading, error } = useTopicTreeQuery();

  // Find the specific topic from the tree
  const topicData = topicsTree?.find(
    (topic) => topic.id.toString() === topicId
  );

  if (isLoading) {
    return (
      <PanelContainer>
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading topic details...</p>
        </div>
      </PanelContainer>
    );
  }

  if (error) {
    return (
      <PanelContainer>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Topic
          </h2>
          <p className="text-red-500 mb-6">
            Failed to load topic details. Please try again later.
          </p>
          <Button asChild>
            <Link href="/admin/topics">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Link>
          </Button>
        </div>
      </PanelContainer>
    );
  }

  if (!topicData) {
    notFound();
  }

  return (
    <PanelContainer>
      {/* Breadcrumb */}
      <Breadcrumb
        className="pt-0!"
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Topics", href: "/admin/topics" },
          { label: topicData.name, href: `/admin/topics/${topicId}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="heading-2 text-primary!">
              {topicData.icon && <span className="mr-2">{topicData.icon}</span>}
              {topicData.name}
            </h1>
            <p className="text-gray-600 mb-4">{topicData.description}</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <span>
                <strong className="text-gray-900">
                  {topicData.branches_count}
                </strong>{" "}
                branches
              </span>
              <span>
                <strong className="text-gray-900">
                  {topicData.publications_count}
                </strong>{" "}
                publications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Branches */}
      <TopicBranches
        topic={{
          id: topicData.id,
          name: topicData.name,
          slug: topicData.slug,
          description: topicData.description || "",
          icon: topicData.icon,
          is_active: true,
          order: 0,
          branches_count: topicData.branches_count,
        }}
        branches={topicData.branches || []}
      />
    </PanelContainer>
  );
}
