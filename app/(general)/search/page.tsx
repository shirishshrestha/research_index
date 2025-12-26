import { MainLayout } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Resource Index",
  description:
    "Search for research articles, journals, authors, and institutions",
};

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="heading-1 text-center mb-8" style={{ color: "#023B8B" }}>
          Search Resources
        </h1>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search articles, journals, authors..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div className="flex justify-center">
            <a
              href="/search/advanced"
              className="text-[#023B8B] hover:underline"
            >
              Advanced Search
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
