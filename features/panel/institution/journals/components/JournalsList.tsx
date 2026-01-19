"use client";

import { useQuery } from "@tanstack/react-query";
import { getJournals } from "../api";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JournalCard } from "./JournalCard";
import { useState } from "react";
import Link from "next/link";

export function JournalsList() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: journals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });

  const filteredJournals = journals?.filter(
    (journal) =>
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load journals</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Journals</h1>
          <p className="text-text-gray mt-1">
            Create and manage your institution's journals
          </p>
        </div>
        <Link href="/institution/journals/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Journal
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search journals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Journal Cards */}
      {filteredJournals && filteredJournals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJournals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-text-gray">
            {searchQuery
              ? "No journals found matching your search"
              : "No journals yet. Create your first journal to get started."}
          </p>
        </div>
      )}
    </div>
  );
}
