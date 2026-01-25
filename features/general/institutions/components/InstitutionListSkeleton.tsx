import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InstitutionListItemSkeleton() {
  return (
    <Card className="p-6.25 hover:shadow-md transition-shadow shadow-none">
      <div className="flex items-center gap-6.25">
        <Skeleton className="w-28 h-28 rounded-full shrink-0" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="flex gap-3.75">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function InstitutionsListSkeleton() {
  return (
    <div className="space-y-4 mt-12">
      {[...Array(10)].map((_, i) => (
        <InstitutionListItemSkeleton key={i} />
      ))}
    </div>
  );
}
