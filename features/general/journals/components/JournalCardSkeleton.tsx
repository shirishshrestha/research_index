import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterSkeleton } from "@/features/shared/components";

export function JournalCardSkeleton() {
  return (
    <Card className="p-6.25 group transition-shadow shadow-xs hover:shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <Skeleton className="h-6 w-64 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Badge */}
          <Skeleton className="h-16 w-24 shrink-0 rounded-md" />
        </div>

        {/* Journal Details */}
        <div className="flex-1 flex gap-12.5">
          <Skeleton className="w-28 h-37.5 shrink-0" />

          <div className="bg-[#ccc] w-px"></div>

          {/* Metrics */}
          <div className="flex w-full items-center">
            <div className="flex justify-between w-full flex-wrap gap-x-8 gap-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="">
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function JournalsListSkeleton() {
  return (
    <div className="pt-12.5! section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
        {/* Left Sidebar - Filters Skeleton */}
        <FilterSkeleton />

        {/* Right Content */}
        <div className="space-y-6">
          {/* Search and Sort Bar Skeleton */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
          </div>

          {/* Journal List */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <JournalCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
