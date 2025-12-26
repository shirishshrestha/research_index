import { MainLayout } from "@/components/layout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Article ${id} - Resource Index`,
    description: `View details for article ${id}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-2 heading-gradient mb-8">Article Details</h1>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Article ID: {id}</p>
          {/* Article content will go here */}
        </div>
      </div>
    </MainLayout>
  );
}
