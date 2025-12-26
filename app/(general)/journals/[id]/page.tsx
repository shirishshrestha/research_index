import { MainLayout } from "@/components/layout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Journal ${id} - Resource Index`,
    description: `View details for journal ${id}`,
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-2 heading-gradient mb-8">Journal Details</h1>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Journal ID: {id}</p>
          {/* Journal content will go here */}
        </div>
      </div>
    </MainLayout>
  );
}
