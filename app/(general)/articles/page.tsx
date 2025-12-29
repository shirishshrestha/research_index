import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - Resource Index",
  description: "Browse research articles",
};

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="heading-2 heading-gradient mb-8">Research Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Article cards will go here */}
        <p className="col-span-full text-center text-gray-600">
          Article listings coming soon...
        </p>
      </div>
    </div>
  );
}
