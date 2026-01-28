import { PanelContainer } from "./PanelContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface PanelLoadingSkeletonProps {
  title: string;
  description: string;
  statsCount?: number;
}

export function PanelLoadingSkeleton({
  title,
  description,
  statsCount = 8,
}: PanelLoadingSkeletonProps) {
  return (
    <PanelContainer>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-text-gray">{description}</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(statsCount)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>

        {/* Charts skeleton */}

        <Skeleton className="h-75 rounded-xl" />
        <Skeleton className="h-75 rounded-xl" />
        <Skeleton className="h-62.5 rounded-xl" />
      </div>
    </PanelContainer>
  );
}
