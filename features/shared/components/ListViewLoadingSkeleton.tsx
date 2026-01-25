import { Skeleton } from "@/components/ui/skeleton";

export function ListViewLoadingSkeleton() {
  return (
    <div className="pt-12.5! section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6.25">
        {/* Left Sidebar Skeleton */}
        <aside className="space-y-6">
          <div className="sticky top-32">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-7 w-7" />
            </div>

            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-2 pl-2">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <div className="space-y-6">
          {/* Search and Sort */}
          <div className="flex justify-between gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-48" />
          </div>

          {/* Content Cards */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-6">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
