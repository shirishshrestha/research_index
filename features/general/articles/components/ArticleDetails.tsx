import { ProfileTabs } from "@/features/shared/components/profile";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared";
import { ChevronDown } from "lucide-react";
import {
  CitationsTab,
  OverviewTab,
  ReferencesTab,
  SimilarArticlesTab,
} from "./TabDetails";

export function ArticleDetails() {
  // Mock data for demonstration
  const article = {
    title: "Impact of Climate Change on Rice Cultivation in Nepal",
    authors: [
      "Glenn S. Orton",
      "Magnus Gustafsson",
      "Leigh N. Fletcher",
      "Michael T. Roman",
      "James A. Sinclair",
    ],
    doi: "10.58291/nrjp.2025.00123",
    pubmedId: "0000-0001-5475-1630",
    publishedAt: "02 May 2025",
    citationCount: 33,
    abstract: `This article showcases the analysis of the risks of information leakage when using online machine translation services and suggests methods for minimising these risks. In connection with the development of technologies and the growing popularity of online services for text translation, the issues of ensuring confidentiality and data security are becoming particularly relevant. Risks such as Google Translate, Microsoft Translator, DeepL and others, are convenient tools for processing large volumes of texts, however, their use in the context of processing confidential information, such as legal, financial, medical documentation and other types of sensitive data may create significant privacy concerns. The article examines the main factors contributing to information leakage when using online translation services and identifies privacy concerns, privacy policies and technical vulnerabilities. The article lists the potential scenarios for confidential information leakage when using various online translation services. It also investigates the risks of future security when transmitting sensitive information through online translation services in comparison.`,
    publicationType: "Systematic Review",
    meshTerms: [
      "Child",
      "Cross-Sectional Studies",
      "Echocardiography* / methods",
      "Echocardiography* / statistics & numerical data",
      "Heart Defects, Congenital* / diagnosis",
      "Heart Defects, Congenital* / epidemiology",
      "Heart Defects, Congenital* / diagnostic imaging",
      "Humans",
      "Nepal / epidemiology",
      "Tertiary Care Centers*",
    ],
    relatedInfo: ["MedGen"],
    linkOut: [
      {
        label: "Medical",
        value: "MedlinePlus Health Information",
      },
    ],
    erratumFor: {
      title: "Impact of Climate Change on Rice Cultivation in Nepal",
      authors:
        "Glenn S. Orton, Magnus Gustafsson, Leigh N. Fletcher, Michael T. Roman, James A. Sinclair",
      publishedAt: "02 May 2025",
      doi: "10.58291/nrjp.2025.00123",
      pubmedId: "0000-0001-5475-1630",
      license: "CC BY-NC-SA 4.0",
    },
  };

  return (
    <div className="section-padding pt-0!">
      {/* Article Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="heading-4 mb-1.25 text-text-black">{article.title}</h1>
          <p className="sub-body italic! mb-2.5">
            {article.authors.join(", ")}
          </p>
          <div className="flex flex-col flex-wrap gap-0.5 ">
            <p className="desc">DOI: {article.doi}</p>
            <p className="desc">PMID: {article.pubmedId}</p>
            <p className="desc">Published at: {article.publishedAt}</p>
          </div>
        </div>
        <Button
          variant={"ghost"}
          className="p-0 leading-normal hover:bg-transparent! hover:text-primary"
        >
          <Icon name="pdf" size={20} className="mr-2" />
          View Full PDF
        </Button>
      </div>

      {/* Tabs */}
      <ProfileTabs
        tabs={[
          {
            label: "Overview",
            value: "overview",
            content: <OverviewTab article={article} />,
          },
          {
            label: "Stats",
            value: "stats",
            content: <>{/* <StatsTab article={article} /> */}</>,
          },
          {
            label: "Citations",
            value: "citations",
            content: <CitationsTab />,
          },
          {
            label: "References",
            value: "references",
            content: <ReferencesTab />,
          },
          {
            label: "Similar Articles",
            value: "similar-articles",
            content: <SimilarArticlesTab />,
          },
        ]}
        moreOptions={
          <div>
            <p className="flex items-center gap-1.5 heading-para">
              More <ChevronDown className="stroke-[1.6px]" size={18} />
            </p>
          </div>
        }
      />
    </div>
  );
}
