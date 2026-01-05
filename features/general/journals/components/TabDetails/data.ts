export interface JournalContent {
  aboutTheJournal?: {
    aimsAndScope?: {
      title: string;
      description: string;
      items: string[];
    };
    benefitsToAuthors?: {
      title: string;
      paragraphs: string[];
    };
    articleTypes?: {
      title: string;
      content: string;
    };
    peerReview?: {
      title: string;
      content: string;
    };
    openAccess?: {
      title: string;
      description: string;
      subscription?: {
        title: string;
        items: string[];
      };
      openAccess?: {
        title: string;
        items: string[];
      };
    };
  };
  ethicsAndPolicies?: {
    ethicsInPublishing?: {
      title: string;
      content: string;
    };
    submissionDeclaration?: {
      title: string;
      content: string;
    };
    authorship?: {
      title: string;
      content: string;
    };
    changesToAuthorship?: {
      title: string;
      content: string;
    };
    competingInterests?: {
      title: string;
      content: string;
    };
    fundingSources?: {
      title: string;
      content: string;
    };
    generativeAI?: {
      title: string;
      content: string;
    };
    preprints?: {
      title: string;
      content: string;
    };
    inclusiveLanguage?: {
      title: string;
      content: string;
    };
    sexGenderAnalyses?: {
      title: string;
      content: string;
    };
    jurisdictionalClaims?: {
      title: string;
      content: string;
    };
  };
  writingAndFormatting?: {
    fileFormat?: {
      title: string;
      content: string;
    };
    latex?: {
      title: string;
      content: string;
    };
    titlePage?: {
      title: string;
      content: string;
    };
    abstract?: {
      title: string;
      content: string;
    };
    keywords?: {
      title: string;
      content: string;
    };
    highlights?: {
      title: string;
      content: string;
    };
    mathFormulae?: {
      title: string;
      content: string;
    };
    tables?: {
      title: string;
      content: string;
    };
    figuresImages?: {
      title: string;
      content: string;
    };
    generativeAIFigures?: {
      title: string;
      content: string;
    };
    video?: {
      title: string;
      content: string;
    };
    researchData?: {
      title: string;
      content: string;
    };
    dataStatement?: {
      title: string;
      content: string;
    };
    dataLinking?: {
      title: string;
      content: string;
    };
    researchElements?: {
      title: string;
      content: string;
    };
    coSubmission?: {
      title: string;
      content: string;
    };
    articleStructure?: {
      title: string;
      content: string;
    };
    references?: {
      title: string;
      content: string;
    };
  };
}

export const journalData: JournalContent = {
  aboutTheJournal: {
    aimsAndScope: {
      title: "Aims and Scope",
      description:
        "Papers with the following subject areas are suitable for publication in the Journal of Quantitative Spectroscopy and Radiative Transfer:",
      items: [
        "Spectra of atoms, molecules: theoretical and experimental aspects;",
        "Spectral lineshape studies including models and computational algorithms;",
        "Spectroscopy of the terrestrial, planetary, and other atmospheres;",
        "Electromagnetic scattering by particles and surfaces: theoretical and experimental aspects;",
        "Electromagnetic energy transfer at nano-scale systems with near-field and coherent effects;",
        "Applications of electromagnetic scattering in particle characterization;",
        "Applications of electromagnetic scattering in biological and biomedical systems;",
        "Applications of electromagnetic scattering in remote sensing and astrophysics;",
      ],
    },
    benefitsToAuthors: {
      title: "Benefits to Authors",
      paragraphs: [
        'We also provide many author benefits, such as free PDFs, a liberal copyright policy, special discounts on Elsevier publications and much more. Please click <a href="#" class="text-primary underline">here</a> for more information on our author services.',
        'Please see our <a href="#" class="text-primary underline">Guide for Authors</a> for information on article submission. If you require any further information or help, please visit our <a href="#" class="text-primary underline">Support Center</a>.',
      ],
    },
    articleTypes: {
      title: "Article Types",
      content:
        "Review Articles, Full Length Articles, Short Communications, and Book Reviews. Errata and corrigenda should not be submitted via Elsevier Editorial Manager but should be reported to the Editor via e-mail. They will be published online prior to the final publication of the issue to which they apply.",
    },
    peerReview: {
      title: "Peer Review",
      content:
        "This journal operates a single anonymized review process. All contributions will be initially assessed by the editor for suitability for the journal. Papers deemed suitable are then typically sent to a minimum of two independent expert reviewers to assess the scientific quality of the paper. The Editor is responsible for the final decision regarding acceptance or rejection of articles. The Editor's decision is final. Editors are not involved in decisions about papers which they have written themselves or have been written by family members or colleagues or which relate to products or services in which the editor has an interest. Any such submission is subject to all of the journal's usual procedures, with peer review handled independently of the relevant editor and their research groups.",
    },
    openAccess: {
      title: "Open Access",
      description:
        "This journal offers authors a choice in publishing their research:",
      subscription: {
        title: "Subscription",
        items: [
          "Articles are made available to subscribers as well as developing countries and patient groups through our universal access programs.",
          "No open access publication fee payable by authors.",
        ],
      },
      openAccess: {
        title: "Open access",
        items: [
          "Articles are freely available to both subscribers and the wider public with permitted reuse.",
          "An open access publication fee is payable by authors or on their behalf, e.g. by their research funder or institution.",
        ],
      },
    },
  },
  ethicsAndPolicies: {
    ethicsInPublishing: {
      title: "Ethics in Publishing",
      content:
        'Please see our information on <a href="#" class="text-primary underline">Ethics in publishing</a>.',
    },
    submissionDeclaration: {
      title: "Submission Declaration",
      content:
        'Submission of an article implies that the work described has not been published previously (except in the form of an abstract, a published lecture or academic thesis, see <a href="#" class="text-primary underline">\'Multiple, redundant or concurrent publication\'</a> for more information), that it is not under consideration for publication elsewhere, that its publication is approved by all authors and tacitly or explicitly by the responsible authorities where the work was carried out, and that, if accepted, it will not be published elsewhere in the same form, in English or in any other language, including electronically without the written consent of the copyright-holder.',
    },
    authorship: {
      title: "Authorship",
      content:
        "All authors should have made substantial contributions to all of the following: (1) the conception and design of the study, or acquisition of data, or analysis and interpretation of data, (2) drafting the article or revising it critically for important intellectual content, (3) final approval of the version to be submitted.",
    },
    changesToAuthorship: {
      title: "Changes to Authorship",
      content:
        "Authors are expected to consider carefully the list and order of authors before submitting their manuscript and provide the definitive list of authors at the time of the original submission. Any addition, deletion or rearrangement of author names in the authorship list should be made only before the manuscript has been accepted and only if approved by the journal Editor.",
    },
    competingInterests: {
      title: "Declaration of Competing Interests",
      content:
        "All authors must disclose any financial and personal relationships with other people or organizations that could inappropriately influence (bias) their work. Examples of potential conflicts of interest include employment, consultancies, stock ownership, honoraria, paid expert testimony, patent applications/registrations, and grants or other funding.",
    },
    fundingSources: {
      title: "Funding Sources",
      content:
        "You are requested to identify who provided financial support for the conduct of the research and/or preparation of the article and to briefly describe the role of the sponsor(s), if any, in study design; in the collection, analysis and interpretation of data; in the writing of the report; and in the decision to submit the article for publication.",
    },
    generativeAI: {
      title: "Declaration of Generative AI Use",
      content:
        "Authors should disclose the use of generative AI and AI-assisted technologies in the writing process by following the instructions below. A statement will appear in the published work. Please note that authors are ultimately responsible and accountable for the contents of the work.",
    },
    preprints: {
      title: "Preprints",
      content:
        'Please note that preprints can be shared anywhere at any time, in line with Elsevier\'s sharing policy. Sharing your preprints e.g. on a preprint server will not count as prior publication (see <a href="#" class="text-primary underline">\'Multiple, redundant or concurrent publication\'</a> for more information).',
    },
    inclusiveLanguage: {
      title: "Use of Inclusive Language",
      content:
        "Inclusive language acknowledges diversity, conveys respect to all people, is sensitive to differences, and promotes equal opportunities. Content should make no assumptions about the beliefs or commitments of any reader; contain nothing which might imply that one individual is superior to another on the grounds of age, gender, race, ethnicity, culture, sexual orientation, disability or health condition; and use inclusive language throughout.",
    },
    sexGenderAnalyses: {
      title: "Reporting Sex- and Gender-Based Analyses",
      content:
        "Reporting guidance: For research involving or pertaining to humans, animals or eukaryotic cells, investigators should integrate sex and gender-based analyses (SGBA) into their research design according to funder/sponsor requirements and best practices within a field.",
    },
    jurisdictionalClaims: {
      title: "Jurisdictional Claims",
      content:
        "In some cases, authors may make claims regarding jurisdictional boundaries (e.g., maps). These claims should be supported by appropriate references and should not assume specific political or territorial positions.",
    },
  },
  writingAndFormatting: {
    fileFormat: {
      title: "File Format",
      content:
        "Manuscript files can be in the following formats: DOC, DOCX, PDF, or LaTeX. Please note that LaTeX submissions must include all source files (including figures).",
    },
    latex: {
      title: "LaTeX",
      content:
        'You are recommended to use the Elsevier article class file or a relevant template for preparing your manuscript. For more information, please refer to the <a href="#" class="text-primary underline">LaTeX instructions</a>.',
    },
    titlePage: {
      title: "Title Page",
      content:
        "The title page should include: The title (concise and informative, avoiding abbreviations and formulae where possible), author names and affiliations (where the author has multiple affiliations, indicate each author's relationship with each institution using superscript numbers), and a corresponding author (clearly indicate who will handle correspondence at all stages).",
    },
    abstract: {
      title: "Abstract",
      content:
        "A concise and factual abstract is required. The abstract should state briefly the purpose of the research, the principal results and major conclusions. An abstract is often presented separately from the article, so it must be able to stand alone. For this reason, References should be avoided, but if essential, then cite the author(s) and year(s). Also, non-standard or uncommon abbreviations should be avoided, but if essential they must be defined at their first mention in the abstract itself.",
    },
    keywords: {
      title: "Keywords",
      content:
        "Immediately after the abstract, provide a maximum of 6 keywords, using American spelling and avoiding general and plural terms and multiple concepts (avoid, for example, 'and', 'of'). Be sparing with abbreviations: only abbreviations firmly established in the field may be eligible.",
    },
    highlights: {
      title: "Highlights",
      content:
        "Highlights are optional yet highly encouraged for this journal, as they increase the discoverability of your article via search engines. They consist of a short collection of bullet points that capture the novel results of your research as well as new methods that were used during the study (if any). Please have a look at the examples here: example Highlights.",
    },
    mathFormulae: {
      title: "Math Formulae",
      content:
        "Please submit math equations as editable text and not as images. Present simple formulae in line with normal text where possible and use the solidus (/) instead of a horizontal line for small fractional terms, e.g., X/Y. In principle, variables are to be presented in italics.",
    },
    tables: {
      title: "Tables",
      content:
        "Please submit tables as editable text and not as images. Tables can be placed either next to the relevant text in the article, or on separate page(s) at the end. Number tables consecutively in accordance with their appearance in the text and place any table notes below the table body.",
    },
    figuresImages: {
      title: "Figures, Images and Artwork",
      content:
        "Ensure that each illustration has a caption. Supply captions separately, not attached to the figure. A caption should comprise a brief title (not on the figure itself) and a description of the illustration. Keep text in the illustrations themselves to a minimum but explain all symbols and abbreviations used.",
    },
    generativeAIFigures: {
      title: "Generative AI and Figures, Images and Artwork",
      content:
        "Authors should disclose in their manuscript if a generative AI technology was used to create images, graphics, artwork, or other visual content. Authors are ultimately responsible and accountable for the contents of the work.",
    },
    video: {
      title: "Video",
      content:
        "Elsevier accepts video material and animation sequences to support and enhance your scientific research. Authors who have video or animation files that they wish to submit with their article are strongly encouraged to include links to these within the body of the article.",
    },
    researchData: {
      title: "Research Data",
      content:
        "This journal encourages and enables you to share data that supports your research publication where appropriate, and enables you to interlink the data with your published articles. Research data refers to the results of observations or experimentation that validate research findings.",
    },
    dataStatement: {
      title: "Data Statement",
      content:
        "To foster transparency, we require you to state the availability of your data in your submission. This may be a requirement of your funding body or institution. You will have the opportunity to provide a data statement during the submission process.",
    },
    dataLinking: {
      title: "Data Linking",
      content:
        "If you have made your research data available in a data repository, you can link your article directly to the dataset. Elsevier collaborates with a number of repositories to link articles on ScienceDirect with relevant repositories, giving readers access to underlying data that gives them a better understanding of the research described.",
    },
    researchElements: {
      title: "Research Elements",
      content:
        "This journal enables you to publish research objects related to your original research – such as data, methods, protocols, software and hardware – as an additional paper in Research Elements.",
    },
    coSubmission: {
      title: "Co-submission of Related Data, Methods or Protocols",
      content:
        "We encourage authors to submit related manuscripts as companion papers when they provide complementary information that enhances the understanding and reproducibility of the research.",
    },
    articleStructure: {
      title: "Article Structure",
      content:
        "Divide your article into clearly defined and numbered sections. Subsections should be numbered 1.1 (then 1.1.1, 1.1.2, ...), 1.2, etc. (the abstract is not included in section numbering).",
    },
    references: {
      title: "References",
      content:
        "Citation in text: Please ensure that every reference cited in the text is also present in the reference list (and vice versa). Any references cited in the abstract must be given in full. Unpublished results and personal communications are not recommended in the reference list, but may be mentioned in the text.",
    },
  },
};
