// Validation helper for questionnaire sections
import type { QuestionnaireFormData } from "../../types/questionnaire";

/**
 * Define required fields for each section
 * Section indices: 0-10 corresponding to SECTIONS array
 */
export const SECTION_REQUIRED_FIELDS: Record<number, string[]> = {
  0: ["journal_name", "issn_print", "publisher_name"], // General Information
  1: ["primary_subject_area"], // Subject Area & Content
  2: ["editor_in_chief_name"], // Editorial Board
  3: ["peer_review_type"], // Peer Review
  4: ["ethical_guidelines_url"], // Publication Ethics
  5: ["articles_published_last_year"], // Publication Statistics
  6: [], // Geographic Distribution - optional
  7: ["license_type"], // Open Access & Licensing
  8: ["submission_system_url"], // Digital Infrastructure
  9: [], // Indexing & Abstracting - optional
  10: [], // Transparency & Verification - optional
};

/**
 * Check if all required fields in a section are filled
 */
export function validateSection(sectionIndex: number, formData: any): boolean {
  const requiredFields = SECTION_REQUIRED_FIELDS[sectionIndex] || [];

  // If no required fields, section is always valid
  if (requiredFields.length === 0) {
    return true;
  }

  // Check if all required fields have values
  return requiredFields.every((field) => {
    const value = formData[field];

    // Check for truthy values (not null, undefined, empty string, empty array)
    if (value === null || value === undefined || value === "") {
      return false;
    }

    // For arrays, check if not empty
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    return true;
  });
}

/**
 * Get all completed sections
 */
export function getCompletedSections(
  formData: Partial<QuestionnaireFormData>,
): Set<number> {
  const completedSections = new Set<number>();

  Object.keys(SECTION_REQUIRED_FIELDS).forEach((sectionIndexStr) => {
    const sectionIndex = parseInt(sectionIndexStr);
    if (validateSection(sectionIndex, formData)) {
      completedSections.add(sectionIndex);
    }
  });

  return completedSections;
}

/**
 * Check if user can navigate to a specific section
 * Rule: Can only navigate to current, previous, or next section if current is complete
 */
export function canNavigateToSection(
  targetSection: number,
  currentSection: number,
  completedSections: Set<number>,
): boolean {
  // Can always go back to previous sections
  if (targetSection <= currentSection) {
    return true;
  }

  // To go forward, all previous sections must be completed
  for (let i = 0; i < targetSection; i++) {
    if (!completedSections.has(i)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if user can proceed to next section
 */
export function canProceedToNext(
  currentSection: number,
  formData: Partial<QuestionnaireFormData>,
): boolean {
  return validateSection(currentSection, formData);
}
