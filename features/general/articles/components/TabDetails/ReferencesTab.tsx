const articles = [
  {
    id: 1,
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors:
      "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
    publishedAt: "02 May 2025",
    doi: "10.58291/nrjp.2025.00123",
    pubmedId: "0000-0001-5475-1630",
    license: "CC BY-NC-SA 4.0",
  },
  {
    id: 2,
    title: "Sustainable Agricultural Practices in Mountain Communities",
    authors: "Ramesh Kumar, Sita Devi, Prakash Sharma",
    publishedAt: "15 Apr 2025",
    doi: "10.58291/nrjp.2025.00089",
    pubmedId: "0000-0002-1234-5678",
    license: "CC BY 4.0",
  },
  {
    id: 3,
    title: "Water Resource Management in the Himalayan Region",
    authors: "Maya Thapa, Bikram Rai, Anita Gurung",
    publishedAt: "28 Mar 2025",
    doi: "10.58291/nrjp.2025.00067",
    pubmedId: "0000-0003-9876-5432",
    license: "CC BY-SA 4.0",
  },
];

export const ReferencesTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <p
            className={`w-full text-left p-2.5 rounded-md transition-all border border-white-02 bg-white hover:bg-gray-50`}
          >
            <span className="text-base text-text-black">
              All Citations (33)
            </span>
          </p>
        </div>
      </aside>
      <aside className="space-y-8.75 pl-6">
        {articles &&
          articles.map((article) => (
            <li
              key={article.id}
              className="space-y-3.75 list-decimal text-primary "
            >
              <div className="space-y-1.25">
                <p className="heading-para text-primary!">{article.title}</p>
                <p className="sub-body">{article.authors}</p>
                <p className="sub-body italic!">
                  Published at: {article.publishedAt}. DOI:&nbsp;
                  {article.doi}. License:&nbsp;
                  {article.license}
                </p>
              </div>
            </li>
          ))}
      </aside>
    </div>
  );
};
