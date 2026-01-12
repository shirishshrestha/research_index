"use client";

// import { createCurrentUserQueryOptions } from "@/features/panel/author/hooks/query/options";
// import { useQuery } from "@tanstack/react-query";

export default function AuthorDashboard() {
  // TODO: Uncomment when API is ready
  // const { data } = useQuery(createCurrentUserQueryOptions);
  // console.log("Author Dashboard - Current User:", data);
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Author Dashboard</h1>
        <p className="mt-2 text-text-gray">
          Manage your research profile and publications
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        \n {/* My Publications */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
            <svg
              className="h-6 w-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            My Publications
          </h3>
          <p className="text-sm text-text-gray">
            View and manage your research publications
          </p>
        </div>
        {/* Submit Publication */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-02">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Submit Publication
          </h3>
          <p className="text-sm text-text-gray">
            Submit a new research paper or article
          </p>
        </div>
        {/* Profile Settings */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
            <svg
              className="h-6 w-6 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Profile Settings
          </h3>
          <p className="text-sm text-text-gray">
            Update your author profile and information
          </p>
        </div>
        {/* Citations & Impact */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-02">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Citations & Impact
          </h3>
          <p className="text-sm text-text-gray">
            Track your research impact and citations
          </p>
        </div>
        {/* Co-authors */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
            <svg
              className="h-6 w-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Co-authors
          </h3>
          <p className="text-sm text-text-gray">
            View and connect with your research collaborators
          </p>
        </div>
        {/* Research Topics */}
        <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
            <svg
              className="h-6 w-6 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Research Topics
          </h3>
          <p className="text-sm text-text-gray">
            Explore and manage your research topics
          </p>
        </div>
      </div>
    </div>
  );
}
