import { ArticleCard } from "../ArticleCard";

const mockArticles = [
  {
    id: "1",
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.58291/nrip.2025.00123",
    badge: { label: "33 Cite", value: "33" },
  },
  {
    id: "2",
    title: "Sustainable Agricultural Practices in Mountain Communities",
    authors: "Ramesh Kumar, Sita Devi, Prakash Sharma",
    publishedAt: "15 Apr 2025",
    doi: "10.58291/nrip.2025.00089",
    badge: { label: "25 Cite", value: "25" },
  },
  {
    id: "3",
    title: "Water Resource Management in the Himalayan Region",
    authors: "Maya Thapa, Bikram Rai, Anita Gurung",
    publishedAt: "28 Mar 2025",
    doi: "10.58291/nrip.2025.00067",
    badge: { label: "18 Cite", value: "18" },
  },
];

export const SimilarArticlesTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6">
      <aside className="space-y-8.75">
        {mockArticles.map((article) => (
          <div key={article.id} className="space-y-6.25">
            <ArticleCard
              title={article.title}
              authors={article.authors}
              publishedAt={article.publishedAt}
              doi={article.doi}
              badge={article.badge}
              href={`/articles/${article.id}`}
            />
          </div>
        ))}
      </aside>
      <aside></aside>
    </div>
  );
};
