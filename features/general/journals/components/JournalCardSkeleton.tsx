import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JournalCardSkeleton() {
  return (
    <Card className="p-6.25 shadow-none">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-16 w-24 shrink-0" />
        </div>

        <div className="flex-1 flex gap-12.5">
          <Skeleton className="w-28 h-37.5 shrink-0" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function JournalsListSkeleton() {
  return (
    <div className="space-y-4 mt-12">
      {[...Array(5)].map((_, i) => (
        <JournalCardSkeleton key={i} />
      ))}
    </div>
  );
}
