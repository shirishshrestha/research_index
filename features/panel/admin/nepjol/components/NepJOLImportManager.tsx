"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Play, Square, RefreshCw } from "lucide-react";
import { NepJOLSyncDialog } from "./NepJOLSyncDialog";
import {
  useNepJOLImportHistoryQuery,
  useNepJOLImportStatusQuery,
  useStartNepJOLImportMutation,
  useStopNepJOLImportMutation,
} from "../hooks";
import type { NepJOLImportStartRequest } from "../types";

export function NepJOLImportManager() {
  const [syncDialogOpen, setSyncDialogOpen] = React.useState(false);
  const [hasStartedImport, setHasStartedImport] = React.useState(false);
  const [importOptions, setImportOptions] =
    React.useState<NepJOLImportStartRequest>({
      max_journals: null,
      max_articles_per_journal: null,
      skip_duplicates: true,
      download_pdfs: true,
      test_mode: false,
    });

  const {
    data: history,
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useNepJOLImportHistoryQuery();

  // Fetch initial status
  const { data: status, isLoading: statusLoading } = useNepJOLImportStatusQuery(
    {
      enabled: true,
      // Poll aggressively when import might be running
      refetchInterval: hasStartedImport ? 1000 : false,
    },
  );

  const startImport = useStartNepJOLImportMutation({
    onSuccess: () => {
      setHasStartedImport(true);
      setSyncDialogOpen(true);
    },
  });

  const stopImport = useStopNepJOLImportMutation({
    onSuccess: () => {
      setHasStartedImport(false);
      refetchHistory();
    },
  });

  const handleStartImport = () => {
    startImport.mutate(importOptions);
  };

  const handleStopImport = () => {
    stopImport.mutate();
  };

  const isImportRunning = status?.is_running || false;

  // Auto-open sync dialog only when user starts an import
  React.useEffect(() => {
    if (hasStartedImport && isImportRunning && !syncDialogOpen) {
      setSyncDialogOpen(true);
    }
  }, [hasStartedImport, isImportRunning, syncDialogOpen]);

  // Reset hasStartedImport when import completes
  React.useEffect(() => {
    if (hasStartedImport && !isImportRunning) {
      // Import has finished
      setHasStartedImport(false);
    }
  }, [hasStartedImport, isImportRunning]);

  if (historyLoading || statusLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Import Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>NepJOL Import Status</CardTitle>
              <CardDescription>
                Import journals and publications from NepJOL (Nepal Journals
                Online)
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetchHistory()}
              disabled={isImportRunning}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          {isImportRunning && status && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  Import in Progress
                </h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                {status.current_stage || "Processing..."}
              </p>
              <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"
                  style={{ width: `${status.progress_percentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {status.progress_percentage.toFixed(1)}% Complete
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSyncDialogOpen(true)}
                >
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* Import Statistics */}
          <div>
            <h4 className="font-semibold mb-3">Import Statistics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-2xl font-bold">
                  {history?.total_journals || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total Journals</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-2xl font-bold">
                  {history?.total_issues || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total Issues</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-2xl font-bold">
                  {history?.total_publications || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Publications
                </p>
              </div>
            </div>
          </div>

          {/* Last Import Details */}
          {history?.last_import && (
            <div>
              <h4 className="font-semibold mb-3">Last Import</h4>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Started At:</span>
                  <span>
                    {history.last_import.started_at
                      ? new Date(
                          history.last_import.started_at,
                        ).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span>
                    {history.last_import.is_running ? "Running" : "Completed"}
                  </span>
                </div>
                {history.last_import.stats && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                    <div className="text-xs">
                      <span className="text-muted-foreground">
                        Journals Created:
                      </span>{" "}
                      <span className="font-semibold">
                        {history.last_import.stats.journals_created}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">
                        Publications Created:
                      </span>{" "}
                      <span className="font-semibold">
                        {history.last_import.stats.publications_created}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Skipped:</span>{" "}
                      <span className="font-semibold">
                        {history.last_import.stats.publications_skipped}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Errors:</span>{" "}
                      <span className="font-semibold text-red-600">
                        {history.last_import.stats.errors}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle>Start New Import</CardTitle>
          <CardDescription>
            Configure and start a new NepJOL import operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_journals">Max Journals (optional)</Label>
              <Input
                id="max_journals"
                type="number"
                placeholder="Leave empty for all"
                value={importOptions.max_journals || ""}
                onChange={(e) =>
                  setImportOptions({
                    ...importOptions,
                    max_journals: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                disabled={isImportRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max_articles">
                Max Articles per Journal (optional)
              </Label>
              <Input
                id="max_articles"
                type="number"
                placeholder="Leave empty for all"
                value={importOptions.max_articles_per_journal || ""}
                onChange={(e) =>
                  setImportOptions({
                    ...importOptions,
                    max_articles_per_journal: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                disabled={isImportRunning}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="skip_duplicates">Skip Duplicates</Label>
            <Switch
              id="skip_duplicates"
              checked={importOptions.skip_duplicates}
              onCheckedChange={(checked) =>
                setImportOptions({ ...importOptions, skip_duplicates: checked })
              }
              disabled={isImportRunning}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="download_pdfs">Download PDFs</Label>
            <Switch
              id="download_pdfs"
              checked={importOptions.download_pdfs}
              onCheckedChange={(checked) =>
                setImportOptions({ ...importOptions, download_pdfs: checked })
              }
              disabled={isImportRunning}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="test_mode">Test Mode (1 journal, 1 issue)</Label>
            <Switch
              id="test_mode"
              checked={importOptions.test_mode}
              onCheckedChange={(checked) =>
                setImportOptions({ ...importOptions, test_mode: checked })
              }
              disabled={isImportRunning}
            />
          </div>

          <div className="flex gap-2 pt-4">
            {!isImportRunning ? (
              <Button
                onClick={handleStartImport}
                disabled={startImport.isPending}
                className="flex-1"
              >
                {startImport.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Import
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setSyncDialogOpen(true)}
                  variant="outline"
                  className="flex-1"
                >
                  View Progress
                </Button>
                <Button
                  onClick={handleStopImport}
                  disabled={stopImport.isPending}
                  variant="destructive"
                  className="flex-1"
                >
                  {stopImport.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Stopping...
                    </>
                  ) : (
                    <>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Import
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sync Dialog */}
      <NepJOLSyncDialog
        open={syncDialogOpen}
        onOpenChange={setSyncDialogOpen}
        status={status}
      />
    </div>
  );
}
