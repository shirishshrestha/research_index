import { PublicationsList } from "@/features/panel/author/publications/components/PublicationsList";
import { getAuthorPublications } from "@/features/panel/author/publications/api/publications.server";
import { Suspense } from "react";
import FullScreenLoader from "@/components/shared/FullScreenLoader";

export default async function PublicationsPage() {
  // Fetch publications server-side
  const initialPublications = await getAuthorPublications();

  return (
    <div className="">
      <Suspense fallback={<FullScreenLoader />}>
        <PublicationsList initialPublications={initialPublications} />
      </Suspense>
    </div>
  );
}
