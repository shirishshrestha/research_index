import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Author ${id} - Resource Index`,
    description: `View profile for author ${id}`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-2 heading-gradient mb-8">Author Profile</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-600">Author ID: {id}</p>
        {/* Author profile content will go here */}
      </div>
    </div>
  );
}
