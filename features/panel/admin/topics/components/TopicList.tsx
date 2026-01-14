"use client";

import * as React from "react";
import { useTopicsQuery } from "../hooks/queries";
import { TopicItem } from "./TopicItem";
import TopicFormDialog from "./TopicFormDialog";
import { ErrorCard } from "@/components/shared/ErrorCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Topic } from "../types";
import { LibraryBig } from "lucide-react";

export function TopicList() {
  const topics = useTopicsQuery();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="heading-3">Topics</h2>
        <TopicFormDialog onSuccess={() => topics.refetch()} />
      </div>

      {topics.isLoading ? (
        <TopicsLoadingSkeleton />
      ) : topics.isError ? (
        <ErrorCard
          title="Failed to load topics"
          message="We couldn't load the topics. Please try again."
          onRetry={() => topics.refetch()}
        />
      ) : !topics.data?.results || topics.data.results.length === 0 ? (
        <EmptyTopicsState />
      ) : (
        <div className="grid gap-4">
          {topics.data.results.map((t: Topic) => (
            <TopicItem key={t.id} topic={t} onUpdate={() => topics.refetch()} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicsLoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border rounded space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="grid gap-2">
              {[...Array(2)].map((_, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyTopicsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg bg-muted/20">
      <div className="text-5xl mb-4">
        <LibraryBig />
      </div>
      <h3 className="text-lg font-semibold mb-2">No topics yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get started by creating your first topic
      </p>
    </div>
  );
}
