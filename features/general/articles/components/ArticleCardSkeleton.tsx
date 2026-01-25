import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArticleCardSkeleton() {
  return (
    <Card className="p-6.25 shadow-none">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <Skeleton className="h-20 w-full" />

        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>

        <div className="flex items-center gap-8 pt-4 border-t border-gray-200">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function ArticlesListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
