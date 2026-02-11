"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Info, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  searchClaimableJournals,
  type ClaimableJournal,
} from "../api/claimJournals";

interface ClaimJournalsSearchProps {
  selectedJournals: number[];
  onSelectJournals: (journalIds: number[]) => void;
}

export function ClaimJournalsSearch({
  selectedJournals,
  onSelectJournals,
}: ClaimJournalsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ClaimableJournal[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    console.log("Searching for journals:", {
      searchQuery,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    });

    try {
      const response = await searchClaimableJournals(searchQuery);
      console.log("Search response:", response);
      setResults(response.results);

      if (response.count === 0) {
        toast.info(
          `No claimable journals found matching "${searchQuery}". Try different search terms.`,
        );
      } else {
        toast.success(`Found ${response.count} journal(s)`);
      }
    } catch (error: any) {
      console.error("Search error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "Failed to search for journals. ";
      if (error.code === "ERR_NETWORK") {
        errorMessage +=
          "Network error - please ensure the backend server is running";
      } else if (error.response?.status === 404) {
        errorMessage +=
          "Search endpoint not found. Check backend configuration.";
      } else if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else {
        errorMessage += "Please check the console for details.";
      }

      toast.error(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleJournal = (journalId: number) => {
    if (selectedJournals.includes(journalId)) {
      onSelectJournals(selectedJournals.filter((id) => id !== journalId));
    } else {
      onSelectJournals([...selectedJournals, journalId]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Search for journals imported from <strong>NEPJOL</strong>,{" "}
          <strong>journal portals</strong>, or other sources. You can select
          multiple journals to claim at once.
        </AlertDescription>
      </Alert>

      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="search">
          Search by journal name, ISSN, or publisher
        </Label>
        <div className="flex gap-2">
          <Input
            id="search"
            placeholder="e.g., Nepal Journal of Science, 1234-5678"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Selected Count */}
      {selectedJournals.length > 0 && (
        <Alert>
          <AlertDescription>
            <strong>{selectedJournals.length}</strong> journal(s) selected
          </AlertDescription>
        </Alert>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Select the journals you want to claim:
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((journal) => (
              <Card
                key={journal.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedJournals.includes(journal.id)
                    ? "border-primary border-2 bg-primary/5"
                    : ""
                }`}
                onClick={() => handleToggleJournal(journal.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedJournals.includes(journal.id)}
                      onCheckedChange={() => handleToggleJournal(journal.id)}
                      className="mt-1"
                    />
                    <div className="flex items-start gap-3 flex-1">
                      <BookOpen className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
                      <div className="space-y-1 flex-1">
                        <h4 className="font-semibold">{journal.title}</h4>
                        {journal.short_title && (
                          <p className="text-sm text-muted-foreground">
                            {journal.short_title}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {journal.issn && (
                            <Badge variant="secondary" className="text-xs">
                              ISSN: {journal.issn}
                            </Badge>
                          )}
                          {journal.e_issn && (
                            <Badge variant="secondary" className="text-xs">
                              E-ISSN: {journal.e_issn}
                            </Badge>
                          )}
                        </div>
                        {journal.publisher && (
                          <p className="text-sm text-muted-foreground">
                            Publisher: {journal.publisher}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground italic">
                          Current owner: {journal.current_owner}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
