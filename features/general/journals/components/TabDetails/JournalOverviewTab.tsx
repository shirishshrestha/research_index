import { JournalSidebarNav } from "../JournalSidebarNav";
import { journalData } from "./data";

// Generate sidebar sections dynamically based on available data
const generateSidebarSections = () => {
  const sections = [];

  // About the Journal section
  if (journalData.aboutTheJournal) {
    const items = [];
    if (journalData.aboutTheJournal.aimsAndScope)
      items.push({
        id: "aims-scope",
        label: "Aims and Scope",
        href: "#aims-scope",
      });
    if (journalData.aboutTheJournal.benefitsToAuthors)
      items.push({
        id: "benefits-authors",
        label: "Benefits to Authors",
        href: "#benefits-authors",
      });
    if (journalData.aboutTheJournal.articleTypes)
      items.push({
        id: "article-types",
        label: "Article Types",
        href: "#article-types",
      });
    if (journalData.aboutTheJournal.peerReview)
      items.push({
        id: "peer-review",
        label: "Peer Review",
        href: "#peer-review",
      });
    if (journalData.aboutTheJournal.openAccess)
      items.push({
        id: "open-access",
        label: "Open Access",
        href: "#open-access",
      });

    if (items.length > 0) {
      sections.push({ title: "About the Journal", items });
    }
  }

  // Ethics and Policies section
  if (journalData.ethicsAndPolicies) {
    const items = [];
    if (journalData.ethicsAndPolicies.ethicsInPublishing)
      items.push({
        id: "ethics-publishing",
        label: "Ethics in publishing",
        href: "#ethics-publishing",
      });
    if (journalData.ethicsAndPolicies.submissionDeclaration)
      items.push({
        id: "submission-declaration",
        label: "Submission declaration",
        href: "#submission-declaration",
      });
    if (journalData.ethicsAndPolicies.authorship)
      items.push({
        id: "authorship",
        label: "Authorship",
        href: "#authorship",
      });
    if (journalData.ethicsAndPolicies.changesToAuthorship)
      items.push({
        id: "changes-authorship",
        label: "Changes to authorship",
        href: "#changes-authorship",
      });
    if (journalData.ethicsAndPolicies.competingInterests)
      items.push({
        id: "competing-interests",
        label: "Declaration of competing interests",
        href: "#competing-interests",
      });
    if (journalData.ethicsAndPolicies.fundingSources)
      items.push({
        id: "funding-sources",
        label: "Funding sources",
        href: "#funding-sources",
      });
    if (journalData.ethicsAndPolicies.generativeAI)
      items.push({
        id: "generative-ai",
        label: "Declaration of generative AI use",
        href: "#generative-ai",
      });
    if (journalData.ethicsAndPolicies.preprints)
      items.push({ id: "preprints", label: "Preprints", href: "#preprints" });
    if (journalData.ethicsAndPolicies.inclusiveLanguage)
      items.push({
        id: "inclusive-language",
        label: "Use of inclusive language",
        href: "#inclusive-language",
      });
    if (journalData.ethicsAndPolicies.sexGenderAnalyses)
      items.push({
        id: "sex-gender-analyses",
        label: "Reporting sex- and gender-based analyses",
        href: "#sex-gender-analyses",
      });
    if (journalData.ethicsAndPolicies.jurisdictionalClaims)
      items.push({
        id: "jurisdictional-claims",
        label: "Jurisdictional claims",
        href: "#jurisdictional-claims",
      });

    if (items.length > 0) {
      sections.push({ title: "Ethics and Policies", items });
    }
  }

  // Writing and Formatting section
  if (journalData.writingAndFormatting) {
    const items = [];
    if (journalData.writingAndFormatting.fileFormat)
      items.push({
        id: "file-format",
        label: "File format",
        href: "#file-format",
      });
    if (journalData.writingAndFormatting.latex)
      items.push({ id: "latex", label: "LaTeX", href: "#latex" });
    if (journalData.writingAndFormatting.titlePage)
      items.push({
        id: "title-page",
        label: "Title page",
        href: "#title-page",
      });
    if (journalData.writingAndFormatting.abstract)
      items.push({ id: "abstract", label: "Abstract", href: "#abstract" });
    if (journalData.writingAndFormatting.keywords)
      items.push({ id: "keywords", label: "Keywords", href: "#keywords" });
    if (journalData.writingAndFormatting.highlights)
      items.push({
        id: "highlights",
        label: "Highlights",
        href: "#highlights",
      });
    if (journalData.writingAndFormatting.mathFormulae)
      items.push({
        id: "math-formulae",
        label: "Math formulae",
        href: "#math-formulae",
      });
    if (journalData.writingAndFormatting.tables)
      items.push({ id: "tables", label: "Tables", href: "#tables" });
    if (journalData.writingAndFormatting.figuresImages)
      items.push({
        id: "figures-images",
        label: "Figures, images and artwork",
        href: "#figures-images",
      });
    if (journalData.writingAndFormatting.generativeAIFigures)
      items.push({
        id: "generative-ai-figures",
        label: "Generative AI and Figures, images and artwork",
        href: "#generative-ai-figures",
      });
    if (journalData.writingAndFormatting.video)
      items.push({ id: "video", label: "Video", href: "#video" });
    if (journalData.writingAndFormatting.researchData)
      items.push({
        id: "research-data",
        label: "Research data",
        href: "#research-data",
      });
    if (journalData.writingAndFormatting.dataStatement)
      items.push({
        id: "data-statement",
        label: "Data statement",
        href: "#data-statement",
      });
    if (journalData.writingAndFormatting.dataLinking)
      items.push({
        id: "data-linking",
        label: "Data linking",
        href: "#data-linking",
      });
    if (journalData.writingAndFormatting.researchElements)
      items.push({
        id: "research-elements",
        label: "Research Elements",
        href: "#research-elements",
      });
    if (journalData.writingAndFormatting.coSubmission)
      items.push({
        id: "co-submission",
        label: "Co-submission of related data, methods or protocols",
        href: "#co-submission",
      });
    if (journalData.writingAndFormatting.articleStructure)
      items.push({
        id: "article-structure",
        label: "Article structure",
        href: "#article-structure",
      });
    if (journalData.writingAndFormatting.references)
      items.push({
        id: "references",
        label: "References",
        href: "#references",
      });

    if (items.length > 0) {
      sections.push({ title: "Writing and Formatting", items });
    }
  }

  return sections;
};

const sidebarSections = generateSidebarSections();

export const JournalOverviewTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      {/* Sidebar Navigation */}
      <aside>
        <JournalSidebarNav sections={sidebarSections} />
      </aside>

      {/* Main Content */}
      <aside className="space-y-8.75">
        {/* About the Journal Section */}
        {journalData.aboutTheJournal && (
          <section className="space-y-6">
            <h2 className="heading-3 text-text-black">About the Journal</h2>

            {journalData.aboutTheJournal.aimsAndScope && (
              <div id="aims-scope" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.aboutTheJournal.aimsAndScope.title}
                </h3>
                <p className="sub-body">
                  {journalData.aboutTheJournal.aimsAndScope.description}
                </p>
                <ul className="space-y-2">
                  {journalData.aboutTheJournal.aimsAndScope.items.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="sub-body flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-text-gray shrink-0 mt-2" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {journalData.aboutTheJournal.benefitsToAuthors && (
              <div id="benefits-authors" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.aboutTheJournal.benefitsToAuthors.title}
                </h3>
                {journalData.aboutTheJournal.benefitsToAuthors.paragraphs.map(
                  (para, index) => (
                    <p
                      key={index}
                      className="sub-body"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  )
                )}
              </div>
            )}

            {journalData.aboutTheJournal.articleTypes && (
              <div id="article-types" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.aboutTheJournal.articleTypes.title}
                </h3>
                <p className="sub-body">
                  {journalData.aboutTheJournal.articleTypes.content}
                </p>
              </div>
            )}

            {journalData.aboutTheJournal.peerReview && (
              <div id="peer-review" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.aboutTheJournal.peerReview.title}
                </h3>
                <p className="sub-body">
                  {journalData.aboutTheJournal.peerReview.content}
                </p>
              </div>
            )}

            {journalData.aboutTheJournal.openAccess && (
              <div id="open-access" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.aboutTheJournal.openAccess.title}
                </h3>
                <p className="sub-body">
                  {journalData.aboutTheJournal.openAccess.description}
                </p>
                {journalData.aboutTheJournal.openAccess.subscription && (
                  <>
                    <p className="sub-body font-semibold">
                      {
                        journalData.aboutTheJournal.openAccess.subscription
                          .title
                      }
                    </p>
                    <ul className="space-y-2">
                      {journalData.aboutTheJournal.openAccess.subscription.items.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="sub-body flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-text-gray shrink-0 mt-2" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
                {journalData.aboutTheJournal.openAccess.openAccess && (
                  <>
                    <p className="sub-body font-semibold mt-4">
                      {journalData.aboutTheJournal.openAccess.openAccess.title}
                    </p>
                    <ul className="space-y-2">
                      {journalData.aboutTheJournal.openAccess.openAccess.items.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="sub-body flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-text-gray shrink-0 mt-2" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
            )}
          </section>
        )}

        {/* Ethics and Policies Section */}
        {journalData.ethicsAndPolicies && (
          <section className="space-y-6">
            <h2 className="heading-3 text-text-black">Ethics and Policies</h2>

            {journalData.ethicsAndPolicies.ethicsInPublishing && (
              <div id="ethics-publishing" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.ethicsInPublishing.title}
                </h3>
                <p
                  className="sub-body"
                  dangerouslySetInnerHTML={{
                    __html:
                      journalData.ethicsAndPolicies.ethicsInPublishing.content,
                  }}
                />
              </div>
            )}

            {journalData.ethicsAndPolicies.submissionDeclaration && (
              <div
                id="submission-declaration"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.submissionDeclaration.title}
                </h3>
                <p
                  className="sub-body"
                  dangerouslySetInnerHTML={{
                    __html:
                      journalData.ethicsAndPolicies.submissionDeclaration
                        .content,
                  }}
                />
              </div>
            )}

            {journalData.ethicsAndPolicies.authorship && (
              <div id="authorship" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.authorship.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.authorship.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.changesToAuthorship && (
              <div
                id="changes-authorship"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.changesToAuthorship.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.changesToAuthorship.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.competingInterests && (
              <div
                id="competing-interests"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.competingInterests.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.competingInterests.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.fundingSources && (
              <div id="funding-sources" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.fundingSources.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.fundingSources.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.generativeAI && (
              <div id="generative-ai" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.generativeAI.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.generativeAI.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.preprints && (
              <div id="preprints" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.preprints.title}
                </h3>
                <p
                  className="sub-body"
                  dangerouslySetInnerHTML={{
                    __html: journalData.ethicsAndPolicies.preprints.content,
                  }}
                />
              </div>
            )}

            {journalData.ethicsAndPolicies.inclusiveLanguage && (
              <div
                id="inclusive-language"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.inclusiveLanguage.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.inclusiveLanguage.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.sexGenderAnalyses && (
              <div
                id="sex-gender-analyses"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.sexGenderAnalyses.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.sexGenderAnalyses.content}
                </p>
              </div>
            )}

            {journalData.ethicsAndPolicies.jurisdictionalClaims && (
              <div
                id="jurisdictional-claims"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.ethicsAndPolicies.jurisdictionalClaims.title}
                </h3>
                <p className="sub-body">
                  {journalData.ethicsAndPolicies.jurisdictionalClaims.content}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Writing and Formatting Section */}
        {journalData.writingAndFormatting && (
          <section className="space-y-6">
            <h2 className="heading-3 text-text-black">
              Writing and Formatting
            </h2>

            {journalData.writingAndFormatting.fileFormat && (
              <div id="file-format" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.fileFormat.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.fileFormat.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.latex && (
              <div id="latex" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.latex.title}
                </h3>
                <p
                  className="sub-body"
                  dangerouslySetInnerHTML={{
                    __html: journalData.writingAndFormatting.latex.content,
                  }}
                />
              </div>
            )}

            {journalData.writingAndFormatting.titlePage && (
              <div id="title-page" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.titlePage.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.titlePage.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.abstract && (
              <div id="abstract" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.abstract.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.abstract.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.keywords && (
              <div id="keywords" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.keywords.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.keywords.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.highlights && (
              <div id="highlights" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.highlights.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.highlights.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.mathFormulae && (
              <div id="math-formulae" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.mathFormulae.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.mathFormulae.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.tables && (
              <div id="tables" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.tables.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.tables.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.figuresImages && (
              <div id="figures-images" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.figuresImages.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.figuresImages.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.generativeAIFigures && (
              <div
                id="generative-ai-figures"
                className="space-y-3.75 scroll-mt-32"
              >
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.generativeAIFigures.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.generativeAIFigures.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.video && (
              <div id="video" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.video.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.video.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.researchData && (
              <div id="research-data" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.researchData.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.researchData.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.dataStatement && (
              <div id="data-statement" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.dataStatement.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.dataStatement.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.dataLinking && (
              <div id="data-linking" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.dataLinking.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.dataLinking.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.researchElements && (
              <div id="research-elements" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.researchElements.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.researchElements.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.coSubmission && (
              <div id="co-submission" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.coSubmission.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.coSubmission.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.articleStructure && (
              <div id="article-structure" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.articleStructure.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.articleStructure.content}
                </p>
              </div>
            )}

            {journalData.writingAndFormatting.references && (
              <div id="references" className="space-y-3.75 scroll-mt-32">
                <h3 className="heading-4 text-text-black">
                  {journalData.writingAndFormatting.references.title}
                </h3>
                <p className="sub-body">
                  {journalData.writingAndFormatting.references.content}
                </p>
              </div>
            )}
          </section>
        )}
      </aside>
    </div>
  );
};
