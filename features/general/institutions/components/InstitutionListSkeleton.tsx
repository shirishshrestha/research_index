import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterSkeleton } from "@/features/shared/components";

export function InstitutionListItemSkeleton() {
  return (
    <Card className="p-6.25 group rounded-md transition-all flex flex-row justify-between gap-4 hover:shadow-md">
      {/* Profile Image and Info */}
      <div className="flex items-center gap-3.75 justify-between">
        <Skeleton className="w-16 h-16 rounded-md shrink-0" />

        {/* Institution Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-56" />
        </div>
      </div>

      {/* Follow Button */}
      <Skeleton className="h-9 w-20 shrink-0" />
    </Card>
  );
}

export function InstitutionsListSkeleton() {
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

          {/* Institution List */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <InstitutionListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
