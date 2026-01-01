export interface AuthorProfileProps {
  author: {
    name: string;
    position: string;
    affiliation: string;
    verifiedEmail: string;
    hIndex: number;
    iIndex: number;
    citations: number;
    about: string;
    disciplines: string[];
  };
}
