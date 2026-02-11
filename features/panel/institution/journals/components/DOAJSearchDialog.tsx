"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Loader2, ExternalLink, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { searchDOAJJournals, type DOAJJournal } from "../api/doajApi";
import { toast } from "sonner";

interface DOAJSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (journal: DOAJJournal) => void;
}

export function DOAJSearchDialog({
  open,
  onOpenChange,
  onImport,
}: DOAJSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DOAJJournal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<DOAJJournal | null>(
    null,
  );
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (page: number = 1) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchDOAJJournals(searchQuery, page, 10);
      setResults(response.results);
      setTotalResults(response.total);
      setCurrentPage(page);

      if (response.results.length === 0) {
        toast.info("No journals found in DOAJ");
      }
    } catch (error: any) {
      console.error("Failed to search DOAJ:", error);
      toast.error(
        error.response?.data?.error || "Failed to search DOAJ journals",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleImport = () => {
    if (!selectedJournal) {
      toast.error("Please select a journal to import");
      return;
    }

    onImport(selectedJournal);
    toast.success("Journal data imported from DOAJ");
    onOpenChange(false);

    // Reset state
    setSearchQuery("");
    setResults([]);
    setSelectedJournal(null);
    setTotalResults(0);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl! max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            Search DOAJ (Directory of Open Access Journals)
          </DialogTitle>
          <DialogDescription>
            Search for your journal in DOAJ to auto-populate journal information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search">Journal Title or ISSN</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., 'Nature' or '2046-1402'"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(1);
                  }
                }}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => handleSearch(1)}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
            </div>
          </div>

          {/* Results Count */}
          {totalResults > 0 && (
            <div className="text-sm text-muted-foreground">
              Found {totalResults} journal{totalResults !== 1 ? "s" : ""} (Page{" "}
              {currentPage} of {totalPages})
            </div>
          )}

          {/* Results List */}
          <ScrollArea className="h-[300px] border rounded-md p-4">
            {results.length === 0 && !isSearching && (
              <div className="text-center text-muted-foreground py-8">
                Search for journals to import from DOAJ
              </div>
            )}

            {isSearching && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">Searching DOAJ...</p>
              </div>
            )}

            <div className="space-y-3">
              {results.map((journal) => (
                <div
                  key={journal.doaj_id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedJournal?.doaj_id === journal.doaj_id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedJournal(journal)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <h4 className="font-semibold text-base">
                          {journal.title}
                        </h4>
                        {selectedJournal?.doaj_id === journal.doaj_id && (
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        )}
                      </div>

                      {journal.alternative_title && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {journal.alternative_title}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mt-2">
                        {journal.issn && (
                          <Badge variant="outline">ISSN: {journal.issn}</Badge>
                        )}
                        {journal.e_issn && (
                          <Badge variant="outline">
                            eISSN: {journal.e_issn}
                          </Badge>
                        )}
                        {journal.publisher_name && (
                          <Badge variant="secondary">
                            {journal.publisher_name}
                          </Badge>
                        )}
                        {journal.language && (
                          <Badge variant="secondary">{journal.language}</Badge>
                        )}
                      </div>

                      {journal.subjects && journal.subjects.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Subjects: {journal.subjects.slice(0, 3).join(", ")}
                            {journal.subjects.length > 3 && "..."}
                          </p>
                        </div>
                      )}

                      {journal.website && (
                        <a
                          href={journal.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSearch(currentPage - 1)}
                disabled={currentPage === 1 || isSearching}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSearch(currentPage + 1)}
                disabled={currentPage === totalPages || isSearching}
              >
                Next
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setSearchQuery("");
                setResults([]);
                setSelectedJournal(null);
                setTotalResults(0);
                setCurrentPage(1);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!selectedJournal}>
              Import Selected Journal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
