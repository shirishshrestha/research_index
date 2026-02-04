"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Loader2, Search } from "lucide-react";
import { crossrefApi } from "../api/crossref";
import type { UseFormReturn } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DOIFetcherProps {
  form: UseFormReturn<any>; // Use any to avoid type conflicts with optional fields
  journalOptions?: Array<{ id: number; title: string }>;
}

export function DOIFetcher({ form, journalOptions }: DOIFetcherProps) {
  const [doiInput, setDoiInput] = React.useState("");
  const [isFetching, setIsFetching] = React.useState(false);
  const [fetchStatus, setFetchStatus] = React.useState<{
    type: "success" | "error" | "warning" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleFetchDOI = async () => {
    if (!doiInput.trim()) {
      setFetchStatus({
        type: "error",
        message: "Please enter a DOI",
      });
      return;
    }

    setIsFetching(true);
    setFetchStatus({ type: null, message: "" });

    try {
      const response = await crossrefApi.getWorkByDOI(doiInput.trim());

      if (response.status === "success" && response.data.normalized) {
        const data = response.data.normalized;

        // Auto-fill form fields with Crossref data
        form.setValue("title", data.title || "");
        form.setValue("doi", data.doi || doiInput.trim());

        // Ensure abstract is filled
        if (data.abstract) {
          form.setValue("abstract", data.abstract);
        }

        // Set publication type based on Crossref type
        if (data.type) {
          const typeMapping: Record<string, string> = {
            "journal-article": "journal_article",
            "proceedings-article": "conference_paper",
            "book-chapter": "book_chapter",
            "posted-content": "preprint",
            dissertation: "thesis",
            report: "technical_report",
            book: "book",
            review: "review",
          };
          const mappedType = typeMapping[data.type] || "journal_article";
          form.setValue("publication_type", mappedType);
        }

        // Set publication date
        if (data.published_date) {
          form.setValue("published_date", data.published_date);
        }

        // Set publisher
        if (data.publisher) {
          form.setValue("publisher", data.publisher);
        }

        // Set volume and pages (note: issue is an FK to JournalIssue, so we can't auto-set it)
        if (data.volume) form.setValue("volume", data.volume);
        if (data.pages) form.setValue("pages", data.pages);

        // Format co-authors
        if (data.authors && data.authors.length > 1) {
          const coAuthors = data.authors
            .slice(1) // Skip first author (that's the logged-in user)
            .map((author) => {
              if (author.family && author.given) {
                return `${author.given} ${author.family}`;
              }
              return author.name || "";
            })
            .filter(Boolean)
            .join(", ");

          if (coAuthors) {
            form.setValue("co_authors", coAuthors);
          }
        }

        // Handle journal - match existing or create new
        if (data.journal) {
          console.log("Journal name from Crossref:", data.journal);
          console.log("ISSN from Crossref:", data.issn);
          console.log("Publisher from Crossref:", data.publisher);

          let matchedJournal = null;

          // Try to match existing journal by name
          if (journalOptions) {
            matchedJournal = journalOptions.find(
              (j) =>
                j.title.toLowerCase() === data.journal.toLowerCase() ||
                j.title.toLowerCase().includes(data.journal.toLowerCase()) ||
                data.journal.toLowerCase().includes(j.title.toLowerCase()),
            );
          }

          if (matchedJournal) {
            // Journal exists - use it
            console.log("Found existing journal:", matchedJournal);
            form.setValue("journal", matchedJournal.id);
            setFetchStatus({
              type: "success",
              message: `Successfully fetched: "${data.title.substring(0, 60)}${data.title.length > 60 ? "..." : ""}"`,
            });
          } else {
            // Journal doesn't exist - create it
            console.log("Journal not found, attempting to create...");
            try {
              const journalResponse = await crossrefApi.importJournal(
                data.journal,
                data.issn || [],
                data.publisher || "",
              );

              console.log("Journal creation response:", journalResponse);

              if (
                journalResponse.status === "success" &&
                journalResponse.journal
              ) {
                console.log(
                  "Journal created successfully, ID:",
                  journalResponse.journal.id,
                );
                form.setValue("journal", journalResponse.journal.id);
                setFetchStatus({
                  type: "success",
                  message: `Successfully fetched publication and created journal "${journalResponse.journal.title}"`,
                });
              } else {
                console.error("Journal creation failed:", journalResponse);
                setFetchStatus({
                  type: "warning",
                  message: `Successfully fetched publication. Note: Could not create journal "${data.journal}". Please select manually.`,
                });
              }
            } catch (journalError: any) {
              console.error("Error creating journal:", journalError);
              console.error("Error details:", journalError.response?.data);
              setFetchStatus({
                type: "warning",
                message: `Successfully fetched publication. Error creating journal "${data.journal}": ${journalError.response?.data?.message || journalError.message}. Please select manually.`,
              });
            }
          }
        } else {
          // No journal in Crossref data
          console.log("No journal data from Crossref");
          setFetchStatus({
            type: "success",
            message: `Successfully fetched: "${data.title.substring(0, 60)}${data.title.length > 60 ? "..." : ""}"`,
          });
        }
      } else {
        setFetchStatus({
          type: "error",
          message: "No data found for this DOI",
        });
      }
    } catch (error) {
      console.error("Error fetching DOI:", error);
      setFetchStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch DOI. Please check the DOI and try again.",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="grid gap-3 p-4 border rounded-lg bg-muted/50">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <h4 className="text-sm font-semibold">Auto-fill from DOI</h4>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="doi-input">
          Enter DOI to auto-fill publication details
        </Label>
        <div className="flex gap-2">
          <Input
            id="doi-input"
            placeholder="e.g., 10.1037/0003-066X.59.1.29"
            value={doiInput}
            onChange={(e) => setDoiInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleFetchDOI();
              }
            }}
            disabled={isFetching}
          />
          <Button
            type="button"
            onClick={handleFetchDOI}
            disabled={isFetching || !doiInput.trim()}
            size="default"
          >
            {isFetching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Fetch
              </>
            )}
          </Button>
        </div>

        {fetchStatus.type && (
          <Alert
            variant={fetchStatus.type === "error" ? "destructive" : "default"}
            className={
              fetchStatus.type === "success"
                ? "border-green-500 text-green-700"
                : ""
            }
          >
            {fetchStatus.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <AlertDescription>{fetchStatus.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Enter a DOI to automatically populate fields like title, authors,
        journal, publication date, and more from Crossref.
      </p>
    </div>
  );
}
