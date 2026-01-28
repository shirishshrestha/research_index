import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FilterSkeleton() {
  return (
    <aside className="space-y-6">
      <div className="sticky top-32">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-7 w-7" />
        </div>

        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4 shadow-xs">
              <Skeleton className="h-5 w-32 mb-3" />
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-9 w-full" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  );
}
