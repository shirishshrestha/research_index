"use client";

import { useGet } from "@/hooks/useApi";
import type {
  NepJOLImportStatus,
  NepJOLImportHistory,
  NepJOLAvailableJournals,
} from "../types";

/**
 * Query hook to fetch current NepJOL import status
 * Configure polling via refetchInterval option (e.g., 1000 for 1s)
 */
export const useNepJOLImportStatusQuery = (options?: {
  enabled?: boolean;
  refetchInterval?: number | false;
}) => {
  return useGet<NepJOLImportStatus>(
    ["nepjol", "import", "status"],
    "/nepjol/import/status/",
    options,
  );
};

/**
 * Query hook to fetch NepJOL import history
 */
export const useNepJOLImportHistoryQuery = () => {
  return useGet<NepJOLImportHistory>(
    ["nepjol", "import", "history"],
    "/nepjol/import/history/",
  );
};

/**
 * Query hook to fetch available journals from NepJOL
 */
export const useNepJOLAvailableJournalsQuery = (options?: {
  enabled?: boolean;
}) => {
  return useGet<NepJOLAvailableJournals>(
    ["nepjol", "journals", "available"],
    "/nepjol/journals/",
    options,
  );
};
