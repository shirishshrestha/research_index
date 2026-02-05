"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  Upload,
  Database,
  AlertCircle,
  XCircle,
} from "lucide-react";
import type { NepJOLImportStatus } from "../types";

interface NepJOLSyncDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: NepJOLImportStatus | undefined;
}

export function NepJOLSyncDialog({
  open,
  onOpenChange,
  status,
}: NepJOLSyncDialogProps) {
  if (!status) return null;

  const hasError = status.error && !status.is_running;
  const progress = status.progress_percentage || 0;
  const displayStage = status.current_stage || "Initializing...";

  // Determine current step based on stats and progress
  const getCurrentStep = () => {
    if (!status.is_running && progress === 100) return 3; // Completed

    // Use stats to determine progress more accurately
    const stats = status.stats;
    if (stats) {
      // If publications are being created, we're in processing stage
      if (stats.publications_created > 0 || stats.publications_skipped > 0) {
        return 2; // Processing publications
      }
      // If journals are being processed, we're in fetching stage
      if (stats.journals_processed > 0 || stats.journals_created > 0) {
        return 1; // Fetching journals
      }
    }

    // Fallback to progress-based logic
    if (progress >= 75) return 2;
    if (progress >= 10) return 1;
    return 0; // Connecting
  };

  const currentStep = getCurrentStep();

  const steps = [
    { icon: Upload, label: "Connecting to NepJOL", threshold: 0 },
    { icon: Database, label: "Fetching journals", threshold: 25 },
    { icon: FileText, label: "Processing publications", threshold: 75 },
  ];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="pointer-events-auto max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">
            {hasError ? "Import Failed" : "Importing Publications from NepJOL"}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-6 items-center text-center pt-6">
            {/* Error UI */}
            {hasError && (
              <>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-red-400 dark:bg-red-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                        Import stopped due to errors
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        {status.error ||
                          "The import process encountered errors and was stopped. Please check your NepJOL connection and try again."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}

            {/* Normal progress UI */}
            {!hasError && (
              <>
                {/* Animated spinner with pulse effect */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
                    <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-400 dark:bg-blue-500 opacity-20" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {progress.toFixed(1)}% Complete
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {displayStage}
                  </p>

                  {/* Current journal/issue/article info */}
                  {status.current_journal && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Journal: {status.current_journal} (
                      {status.current_journal_index}/{status.total_journals})
                    </p>
                  )}
                  {status.current_issue && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Issue: {status.current_issue}
                    </p>
                  )}
                  {status.current_article && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Article: {status.current_article}
                    </p>
                  )}

                  {/* Estimated time remaining */}
                  {status.estimated_time_remaining && (
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      Estimated time remaining:{" "}
                      {status.estimated_time_remaining}
                    </p>
                  )}
                </div>

                {/* Progress counts from backend */}
                {status.stats && (
                  <div className="flex justify-center gap-4 text-xs flex-wrap">
                    {status.stats.journals_created > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {status.stats.journals_created}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Journals Created
                        </span>
                      </div>
                    )}
                    {status.stats.publications_created > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {status.stats.publications_created}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Publications
                        </span>
                      </div>
                    )}
                    {status.stats.issues_created > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {status.stats.issues_created}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Issues
                        </span>
                      </div>
                    )}
                    {status.stats.publications_skipped > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {status.stats.publications_skipped}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Skipped
                        </span>
                      </div>
                    )}
                    {status.stats.errors > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {status.stats.errors}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Errors
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Step indicators */}
                <div className="flex justify-center gap-6 py-2">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                          isActive ? "scale-110" : "scale-100 opacity-60"
                        }`}
                      >
                        <div
                          className={`rounded-full p-2 ${
                            isComplete
                              ? "bg-green-100 dark:bg-green-900/30"
                              : isActive
                                ? "bg-blue-100 dark:bg-blue-900/30 animate-pulse"
                                : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isComplete
                                ? "text-green-600 dark:text-green-400"
                                : isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400 dark:text-gray-500"
                            }`}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Warning message */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    <strong className="font-semibold">
                      The import will continue in the background.
                    </strong>
                    <br />
                    You can safely close this dialog or navigate away; the
                    import process will not be interrupted.
                  </p>
                </div>

                {/* Tip */}
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  Tip: All imported publications will appear in the journals
                  list once complete.
                </p>

                {/* Close button for dialog */}
                <div className="flex justify-center pt-2">
                  <Button type="button" onClick={() => onOpenChange(false)}>
                    Close Dialog
                  </Button>
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
