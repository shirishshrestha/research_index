// Export all questionnaire section components

export {
  GeneralInformationSection,
  type SectionFormRef,
} from "./GeneralInformationSection";
export { SubjectAreaSection } from "./SubjectAreaSection";
export { EditorialBoardSection } from "./EditorialBoardSection";
export { PeerReviewSection } from "./PeerReviewSection";
export { PublicationEthicsSection } from "./PublicationEthicsSection";
export { PublicationStatisticsSection } from "./PublicationStatisticsSection";
export { GeographicDistributionSection } from "./GeographicDistributionSection";
export { OpenAccessSection } from "./OpenAccessSection";
export { DigitalInfrastructureSection } from "./DigitalInfrastructureSection";
export { IndexingSection } from "./IndexingSection";
export { TransparencySection } from "./TransparencySection";

// Export questionnaire UI components
export { QuestionnaireHeader } from "./QuestionnaireHeader";
export { ProgressTracker } from "./ProgressTracker";
export { SectionNavigator } from "./SectionNavigator";
export { NavigationFooter } from "./NavigationFooter";
export { SectionContent } from "./SectionContent";

// Export validation utilities
export {
  validateSection,
  getCompletedSections,
  canNavigateToSection,
  canProceedToNext,
  SECTION_REQUIRED_FIELDS,
} from "./validation";
