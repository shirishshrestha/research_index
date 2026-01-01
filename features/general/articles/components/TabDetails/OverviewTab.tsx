import type { ArticleDetailsProps } from "../../types";

const categories = [
  { label: "Abstract", value: "abstract" },
  { label: "Erratum for", value: "erratum" },
  { label: "Publication Type", value: "publicationType" },
  { label: "MeSH Terms", value: "meshTerms" },
  { label: "Related Information", value: "relatedInfo" },
  { label: "LinkOut - More Resources", value: "linkOut" },
];

export const OverviewTab = ({ article }: ArticleDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          {categories.map((category) => {
            return (
              <a
                key={category.value}
                href={`#${category.value}`}
                className={`w-full text-left p-2.5 rounded-md transition-all border border-white-02 bg-white hover:bg-gray-50
              `}
              >
                <span className="text-base text-text-black">
                  {category.label}{" "}
                </span>
              </a>
            );
          })}
        </div>
      </aside>
      <aside className="space-y-8.75">
        <div className="space-y-3.75">
          <h3 className="heading-4 text-text-black">Abstract</h3>
          <p className="sub-body">{article.abstract}</p>
        </div>

        {article.erratumFor && (
          <div className="space-y-3.75">
            <h3 className="heading-4 text-text-black">Erratum for</h3>
            <div className="space-y-1.25">
              <p className="heading-para text-primary!">
                {article.erratumFor.title}
              </p>
              <p className="sub-body">{article.erratumFor.authors}</p>
              <p className="sub-body italic!">
                Published at: {article.erratumFor.publishedAt}. DOI:{" "}
                {article.erratumFor.doi}. License: {article.erratumFor.license}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3.75">
          <h3 className="heading-4 text-text-black">Publication Type</h3>
          <p className="text-base text-text-gray">{article.publicationType}</p>
        </div>

        <div className="space-y-3.75">
          <h3 className="heading-4 text-text-black">MeSH Terms</h3>
          <ul>
            {article.meshTerms.map((term, index) => (
              <li key={index} className="sub-body flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-text-gray shrink-0 " />
                {term}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3.75">
          <h3 className="heading-4 text-text-black">Related Information</h3>

          <ul className="space-y-2.5">
            {article.relatedInfo.map((info, index) => (
              <li key={index}>
                <p className="sub-body">{info}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3.75">
          <h3 className="heading-4 text-text-black">
            LinkOut - More Resources
          </h3>

          {article.linkOut.map((resource) => (
            <div key={resource.label} className="space-y-1.25">
              <p className="heading-para text-text-black">{resource.label}</p>
              <p className="sub-body">{resource.value}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};
