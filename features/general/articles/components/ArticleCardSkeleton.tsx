import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterSkeleton } from "@/features/shared/components";

export function ArticleCardSkeleton() {
  return (
    <Card className="p-6.25 group hover:shadow-md duration-300 transition-shadow shadow-none">
      <div className="flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4.5 w-4.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-1/2 mb-1" />
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Citation Badge */}
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Article Actions */}
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </Card>
  );
}

export function ArticlesListSkeleton() {
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

          {/* Article List */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
