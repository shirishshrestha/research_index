import { api } from "@/services/api";
import type {
  JournalQuestionnaire,
  QuestionnaireListItem,
  QuestionnaireFormData,
  QuestionnaireCreateResponse,
  QuestionnaireUpdateResponse,
} from "../types";

const QUESTIONNAIRE_ENDPOINT = "/publications/questionnaires/";
const JOURNAL_QUESTIONNAIRE_ENDPOINT = "/publications/journals/";

/**
 * Get all questionnaires for the authenticated institution
 */
export const getQuestionnaires = async (): Promise<QuestionnaireListItem[]> => {
  return api.get<QuestionnaireListItem[]>(QUESTIONNAIRE_ENDPOINT);
};

/**
 * Get a specific questionnaire by ID
 */
export const getQuestionnaire = async (
  id: number,
): Promise<JournalQuestionnaire> => {
  return api.get<JournalQuestionnaire>(`${QUESTIONNAIRE_ENDPOINT}${id}/`);
};

/**
 * Get questionnaire for a specific journal
 */
export const getJournalQuestionnaire = async (
  journalId: number,
): Promise<JournalQuestionnaire> => {
  return api.get<JournalQuestionnaire>(
    `${JOURNAL_QUESTIONNAIRE_ENDPOINT}${journalId}/questionnaire/`,
  );
};

/**
 * Create a new questionnaire for a journal
 */
export const createQuestionnaire = async (
  journalId: number,
  data: Partial<QuestionnaireFormData>,
): Promise<QuestionnaireCreateResponse> => {
  return api.post<QuestionnaireCreateResponse>(
    `${JOURNAL_QUESTIONNAIRE_ENDPOINT}${journalId}/questionnaire/`,
    data,
  );
};

/**
 * Update an existing questionnaire (partial update)
 */
export const updateQuestionnaire = async (
  id: number,
  data: Partial<QuestionnaireFormData>,
): Promise<QuestionnaireUpdateResponse> => {
  return api.patch<QuestionnaireUpdateResponse>(
    `${QUESTIONNAIRE_ENDPOINT}${id}/`,
    data,
  );
};

/**
 * Update an existing questionnaire (full update)
 */
export const replaceQuestionnaire = async (
  id: number,
  data: QuestionnaireFormData,
): Promise<QuestionnaireUpdateResponse> => {
  return api.put<QuestionnaireUpdateResponse>(
    `${QUESTIONNAIRE_ENDPOINT}${id}/`,
    data,
  );
};

/**
 * Delete a questionnaire
 */
export const deleteQuestionnaire = async (
  id: number,
): Promise<{ message: string }> => {
  return api.delete<{ message: string }>(`${QUESTIONNAIRE_ENDPOINT}${id}/`);
};
