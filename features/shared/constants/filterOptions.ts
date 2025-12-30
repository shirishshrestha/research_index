export interface Option {
  value: string;
  label: string;
}

export const accessTypeOptions: Option[] = [
  { value: "open_access", label: "Open Access" },
  { value: "free_to_read", label: "Free to Read" },
  { value: "all_content", label: "All Content" },
];

export const categoryOptions: Option[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "environment", label: "Environment" },
  { value: "engineering", label: "Engineering" },
  { value: "medicine", label: "Medicine" },
  { value: "social_sciences", label: "Social Sciences" },
  { value: "arts_humanities", label: "Arts & Humanities" },
  { value: "computer_science", label: "Computer Science" },
  { value: "education", label: "Education" },
  { value: "management", label: "Management" },
  { value: "economics", label: "Economics" },
  { value: "law", label: "Law" },
];

export const languageOptions: Option[] = [
  { value: "english", label: "English" },
  { value: "nepali", label: "Nepali" },
];

export const licenseOptions: Option[] = [
  { value: "cc_by", label: "CC BY" },
  { value: "cc_by_sa", label: "CC BY-SA" },
  { value: "cc_by_nc", label: "CC BY-NC" },
  { value: "cc_by_nd", label: "CC BY-ND" },
  { value: "cc_by_nc_sa", label: "CC BY-NC-SA" },
  { value: "cc_by_nc_nd", label: "CC BY-NC-ND" },
];

export const yearOptions: Option[] = [
  { value: "today", label: "Today" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "last_6_months", label: "Last 6 months" },
  { value: "last_year", label: "Last year" },
  { value: "custom", label: "Custom range" },
];

export const institutionOptions: Option[] = [
  { value: "tu", label: "Tribhuvan University" },
  { value: "ku", label: "Kathmandu University" },
  { value: "pu", label: "Pokhara University" },
  { value: "nast", label: "Nepal Academy of Science & Technology" },
  { value: "other", label: "Other Institutions" },
];

export const countryOptionsExtended: Option[] = [
  { value: "nepal", label: "Nepal" },
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "australia", label: "Australia" },
  { value: "other", label: "Other Countries" },
];

export const peerReviewOptions: Option[] = [
  { value: "peer_review", label: "Peer Review" },
  { value: "double_anonymous", label: "Double Anonymous Peer Review" },
  { value: "single_anonymous", label: "Single Anonymous Peer Review" },
  { value: "open_peer", label: "Open Peer Review" },
  { value: "editorial", label: "Editorial Review" },
];

export const advancedSearchOptions: Option[] = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "keywords", label: "Keywords" },
  { value: "abstract", label: "Abstract" },
  { value: "doi", label: "DOI" },
  { value: "isbn_issn", label: "ISBN / ISSN" },
];

export const publicationCountOptionsExtended: Option[] = [
  { value: "1_10", label: "1–10" },
  { value: "11_50", label: "11–50" },
  { value: "51_100", label: "51–100" },
  { value: "101_500", label: "101–500" },
  { value: "500_plus", label: "More than 500" },
];

export const publicationTypeOptions: Option[] = [
  { value: "journal", label: "Journal" },
  { value: "book", label: "Book" },
  { value: "conference", label: "Conference" },
  { value: "thesis", label: "Thesis" },
  { value: "report", label: "Report" },
  { value: "newspaper", label: "Newspaper Article" },
];

export const researchFocusOptionsExtended: Option[] = [
  { value: "applied", label: "Applied Research" },
  { value: "basic", label: "Basic Research" },
  { value: "interdisciplinary", label: "Interdisciplinary Research" },
];

export const subjectOptions: Option[] = [
  { value: "select_subject", label: "Select Subject" },
  { value: "browse_subject_tree", label: "Browse Subject Tree" },
];

export const sortOptionsExtended: Option[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most_cited", label: "Most Cited" },
  { value: "alphabetical", label: "Alphabetical" },
];
