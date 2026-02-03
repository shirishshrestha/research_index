import type { Publication } from "@/features/panel/author/publications/types";
import { RichTextDisplay } from "@/components/shared/RichTextDisplay";

const categories = [
  { label: "Abstract", value: "abstract" },
  { label: "Erratum for", value: "erratum" },
  { label: "Publication Type", value: "publicationType" },
  { label: "MeSH Terms", value: "meshTerms" },
  { label: "Related Information", value: "relatedInfo" },
  { label: "LinkOut - More Resources", value: "linkOut" },
];

interface OverviewTabProps {
  article: Publication;
}

export const OverviewTab = ({ article }: OverviewTabProps) => {
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
          <h3 className="heading-4 text-text-black scroll-mt-32" id="abstract">
            Abstract
          </h3>
          <div className="sub-body">
            {article.abstract ? (
              <RichTextDisplay content={article.abstract} />
            ) : (
              <p>No abstract available.</p>
            )}
          </div>
        </div>

        {article.erratum_from && (
          <div className="space-y-3.75 scroll-mt-32" id="erratum">
            <h3 className="heading-4 text-text-black">Erratum for</h3>
            <div className="space-y-1.25">
              <p className="heading-para text-primary!">
                {article.erratum_from_title}
              </p>
              <p className="sub-body">
                Original article ID: {article.erratum_from}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3.75 scroll-mt-32" id="publicationType">
          <h3 className="heading-4 text-text-black">Publication Type</h3>
          <p className="text-base text-text-gray">
            {article.publication_type_display}
          </p>
        </div>

        {article.mesh_terms && article.mesh_terms.length > 0 && (
          <div className="space-y-3.75 scroll-mt-32" id="meshTerms">
            <h3 className="heading-4 text-text-black">MeSH Terms</h3>
            <ul>
              {article.mesh_terms.map((term, index) => (
                <li key={index} className="sub-body flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-text-gray shrink-0 " />
                  {term.term} {term.term_type === "major" && "(Major Topic)"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.link_outs && article.link_outs.length > 0 && (
          <div className="space-y-3.75 scroll-mt-32" id="linkOut">
            <h3 className="heading-4 text-text-black">
              LinkOut - More Resources
            </h3>

            {article.link_outs.map((resource) => (
              <div key={resource.id} className="space-y-1.25">
                <p className="heading-para text-text-black">
                  {resource.link_type_display}
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sub-body text-primary hover:underline"
                >
                  {resource.description || resource.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};
