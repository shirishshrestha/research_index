import Link from "next/link";
import { Card } from "@/components/ui/card";

const mockArticles = [
  {
    id: "1",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.58291/nrip.2025.00123",
    citations: 33,
  },
  {
    id: "2",
    title: "Sustainable Agricultural Practices in Mountain Communities",
    authors: "Ramesh Kumar, Sita Devi, Prakash Sharma",
    publishedAt: "15 Apr 2025",
    doi: "10.58291/nrip.2025.00089",
    citations: 25,
  },
  {
    id: "3",
    title: "Water Resource Management in the Himalayan Region",
    authors: "Maya Thapa, Bikram Rai, Anita Gurung",
    publishedAt: "28 Mar 2025",
    doi: "10.58291/nrip.2025.00067",
    citations: 18,
  },
];

export const SimilarArticlesTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6">
      <aside className="flex flex-col gap-8.75">
        {mockArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-primary mb-2 hover:underline">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {article.authors}
                  </p>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>Published: {article.publishedAt}</span>
                    <span>·</span>
                    <span>DOI: {article.doi}</span>
                  </div>
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {article.citations} Cite
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </aside>
      <aside></aside>
    </div>
  );
};
