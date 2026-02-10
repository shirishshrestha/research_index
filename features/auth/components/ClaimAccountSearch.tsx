"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, CheckCircle2, User, Info } from "lucide-react";
import { toast } from "sonner";
import {
  searchImportedAuthors,
  type ImportedAuthor,
} from "../api/claimAccount";

interface ClaimAccountSearchProps {
  onSelectProfile: (profile: ImportedAuthor) => void;
}

export function ClaimAccountSearch({
  onSelectProfile,
}: ClaimAccountSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ImportedAuthor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    console.log("Searching for:", {
      searchQuery,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    });

    try {
      const response = await searchImportedAuthors(searchQuery);
      console.log("Search response:", response);
      setResults(response.results);

      if (response.count === 0) {
        toast.info(
          `No imported author profiles found matching "${searchQuery}". Try different search terms or check if the profile exists in the database.`,
        );
      } else {
        toast.success(`Found ${response.count} profile(s)`);
      }
    } catch (error: any) {
      console.error("Search error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      let errorMessage = "Failed to search for profiles. ";
      if (error.code === "ERR_NETWORK") {
        errorMessage +=
          "Network error - please ensure the backend server is running at http://localhost:8000";
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

  const handleSelect = (profile: ImportedAuthor) => {
    setSelectedId(profile.id);
    onSelectProfile(profile);
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
          Search for your imported profile using your <strong>name</strong>,{" "}
          <strong>ORCID</strong>, or <strong>institution name</strong>. This
          includes authors imported from <strong>NEPJOL</strong>,{" "}
          <strong>journal portals</strong>, <strong>Crossref</strong>, and other
          external sources.
        </AlertDescription>
      </Alert>

      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="search">Search by name, ORCID, or institution</Label>
        <div className="flex gap-2">
          <Input
            id="search"
            placeholder="e.g., John Doe, 0000-0001-2345-6789"
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

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Select your profile from the results below:
          </p>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((profile) => (
              <Card
                key={profile.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedId === profile.id
                    ? "border-primary border-2 bg-primary/5"
                    : ""
                }`}
                onClick={() => handleSelect(profile)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <User className="h-5 w-5 mt-1 text-muted-foreground" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            {profile.title} {profile.full_name}
                          </h4>
                          {selectedId === profile.id && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {profile.institute}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {profile.designation}
                        </p>
                        {profile.orcid && (
                          <p className="text-xs text-muted-foreground">
                            ORCID: {profile.orcid}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground italic">
                          Current email: {profile.email}
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
