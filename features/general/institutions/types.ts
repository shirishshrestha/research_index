export interface InstitutionProfileProps {
  institution: {
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
