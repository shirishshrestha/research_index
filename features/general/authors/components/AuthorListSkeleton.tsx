import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterSkeleton } from "@/features/shared/components";

export function AuthorListItemSkeleton() {
  return (
    <Card className="p-6.25 group rounded-md transition-all flex flex-row justify-between gap-4 hover:shadow-md">
      {/* Profile Image and Info */}
      <div className="flex items-center gap-3.75 justify-between">
        <Skeleton className="w-16 h-16 rounded-md shrink-0" />

        {/* Author Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-56" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </Card>
  );
}

export function AuthorsListSkeleton() {
  return (
    <div className="pt-12.5! section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
        {/* Left Sidebar - Filter Skeleton */}
        <FilterSkeleton />

        {/* Right Content - List Skeleton */}
        <div className="space-y-6">
          {/* Search and Sort Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-xs">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-48" />
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <AuthorListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
