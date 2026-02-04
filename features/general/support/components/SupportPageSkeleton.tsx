import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function SupportPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6 section-padding pt-12.5!">
      {/* Main Content Skeleton */}
      <div className="space-y-8.75">
        {/* Overview Section */}
        <div className="space-y-3.75">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-3.75">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Support Section */}
        <div className="space-y-3.75">
          <Skeleton className="h-8 w-56" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-3.75">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-6 w-6 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Network Section */}
        <div className="space-y-3.75">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <Skeleton className="h-24 w-24 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 space-y-4">
          <Skeleton className="h-6 w-32 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </aside>
    </div>
  );
}
