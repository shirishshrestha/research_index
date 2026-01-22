import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionnaireSchemaType } from "@/features/panel/institution/journals/schemas/questionnaireSchema";

export interface QuestionnaireState extends Partial<QuestionnaireSchemaType> {
  journalId?: number;
  questionnaireId?: number;
  currentSection: number;
  completedSections: number[];
}

const initialState: QuestionnaireState = {
  journalId: undefined,
  questionnaireId: undefined,
  currentSection: 0,
  completedSections: [],
};

/**
 * Helper function to determine which sections are complete based on filled data.
 * Checks if the key required fields for each section are filled.
 */
const determineCompletedSections = (
  data: Partial<QuestionnaireSchemaType>,
): number[] => {
  const completed: number[] = [];

  // Section 0: General Information
  if (
    data.journal_title &&
    data.issn &&
    data.publisher_name &&
    data.publisher_country &&
    data.year_first_publication &&
    data.publication_frequency &&
    data.publication_format &&
    data.journal_website_url &&
    data.contact_email
  ) {
    completed.push(0);
  }

  // Section 1: Subject Area
  if (data.main_discipline && data.aims_and_scope) {
    completed.push(1);
  }

  // Section 2: Editorial Board
  if (
    data.editor_in_chief_name &&
    data.editor_in_chief_affiliation &&
    data.editor_in_chief_country &&
    data.editorial_board_members_count !== undefined &&
    data.editorial_board_countries &&
    data.foreign_board_members_percentage !== undefined &&
    data.board_details_published !== undefined
  ) {
    completed.push(2);
  }

  // Section 3: Peer Review
  if (
    data.uses_peer_review !== undefined &&
    data.peer_review_procedure_published !== undefined
  ) {
    completed.push(3);
  }

  // Section 4: Publication Ethics
  if (
    data.follows_publication_ethics !== undefined &&
    data.uses_plagiarism_detection !== undefined
  ) {
    completed.push(4);
  }

  // Section 5: Publication Statistics
  if (
    data.issues_published_in_year !== undefined &&
    data.articles_published_in_year !== undefined &&
    data.submissions_rejected !== undefined &&
    data.average_acceptance_rate !== undefined
  ) {
    completed.push(5);
  }

  // Section 6: Geographic Distribution
  if (
    data.total_authors_in_year !== undefined &&
    data.foreign_authors_count !== undefined &&
    data.author_countries_count !== undefined &&
    data.foreign_authors_percentage !== undefined
  ) {
    completed.push(6);
  }

  // Section 7: Open Access
  if (
    data.is_open_access !== undefined &&
    data.has_apc !== undefined &&
    data.apc_currency
  ) {
    completed.push(7);
  }

  // Section 8: Digital Infrastructure
  if (
    data.assigns_dois !== undefined &&
    data.uses_online_submission_system !== undefined
  ) {
    completed.push(8);
  }

  // Section 9: Indexing
  if (data.indexed_databases) {
    completed.push(9);
  }

  // Section 10: Transparency
  if (
    data.completed_by_name &&
    data.completed_by_role &&
    data.data_is_verifiable !== undefined &&
    data.data_matches_website !== undefined &&
    data.consent_to_evaluation !== undefined
  ) {
    completed.push(10);
  }

  return completed;
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setJournalId: (state, action: PayloadAction<number>) => {
      state.journalId = action.payload;
    },
    setQuestionnaireId: (state, action: PayloadAction<number>) => {
      state.questionnaireId = action.payload;
    },
    setCurrentSection: (state, action: PayloadAction<number>) => {
      state.currentSection = action.payload;
    },
    updateSectionData: (
      state,
      action: PayloadAction<Partial<QuestionnaireSchemaType>>,
    ) => {
      return { ...state, ...action.payload };
    },
    markSectionComplete: (state, action: PayloadAction<number>) => {
      if (!state.completedSections.includes(action.payload)) {
        state.completedSections.push(action.payload);
      }
    },
    initializeQuestionnaire: (
      state,
      action: PayloadAction<{
        journalId: number;
        questionnaireId?: number;
        data?: Partial<QuestionnaireSchemaType>;
      }>,
    ) => {
      state.journalId = action.payload.journalId;
      state.questionnaireId = action.payload.questionnaireId;
      state.currentSection = 0; // Always start from beginning

      if (action.payload.data) {
        // Merge data into state
        Object.assign(state, action.payload.data);

        // Automatically determine which sections are complete
        state.completedSections = determineCompletedSections(
          action.payload.data,
        );
      } else {
        // New questionnaire - reset completed sections
        state.completedSections = [];
      }
    },
    resetQuestionnaire: () => initialState,
  },
});

export const {
  setJournalId,
  setQuestionnaireId,
  setCurrentSection,
  updateSectionData,
  markSectionComplete,
  initializeQuestionnaire,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
