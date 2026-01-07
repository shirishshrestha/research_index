"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Home,
  RefreshCcw,
  ArrowLeft,
  FileX,
  BookOpen,
  Building2,
  Newspaper,
  Search,
  Mail,
  User,
  LogIn,
} from "lucide-react";
import Link from "next/link";

interface ErrorContext {
  title: string;
  description: string;
  icon: React.ReactNode;
  suggestions: string[];
  color: string;
}

const getErrorContext = (path: string): ErrorContext => {
  // Authentication pages
  if (path.includes("/login") || path.includes("/signup")) {
    return {
      title: "Authentication Error",
      description:
        "We encountered an issue while processing your authentication request.",
      icon: <LogIn className="h-16 w-16" />,
      suggestions: [
        "Clear your browser cache and cookies",
        "Try using a different browser",
        "Check if your email format is valid",
        "Ensure your password meets requirements",
      ],
      color: "from-blue-500 to-purple-600",
    };
  }

  // Authors pages
  if (path.includes("/authors")) {
    return {
      title: "Author Content Error",
      description:
        "Unable to load author information. This could be due to a data synchronization issue.",
      icon: <User className="h-16 w-16" />,
      suggestions: [
        "The author profile may have been recently updated",
        "Check if the author ID is correct",
        "Try refreshing the author list",
        "Verify network connectivity",
      ],
      color: "from-emerald-500 to-teal-600",
    };
  }

  // Institutions pages
  if (path.includes("/institutions")) {
    return {
      title: "Institution Data Error",
      description:
        "Failed to retrieve institution details. The data may be temporarily unavailable.",
      icon: <Building2 className="h-16 w-16" />,
      suggestions: [
        "Institution data may be updating",
        "Check member permissions",
        "Verify institution ID is valid",
        "Try accessing from the institutions list",
      ],
      color: "from-indigo-500 to-blue-600",
    };
  }

  // Journals pages
  if (path.includes("/journals")) {
    return {
      title: "Journal Loading Error",
      description:
        "Unable to load journal information. There may be an issue with the journal database.",
      icon: <Newspaper className="h-16 w-16" />,
      suggestions: [
        "Journal metadata may be syncing",
        "Check if the journal is published",
        "Verify access permissions",
        "Try searching for the journal again",
      ],
      color: "from-amber-500 to-orange-600",
    };
  }

  // Publications/Articles pages
  if (path.includes("/articles") || path.includes("/publications")) {
    return {
      title: "Publication Access Error",
      description:
        "We couldn't load the publication. This might be due to access restrictions or data availability.",
      icon: <BookOpen className="h-16 w-16" />,
      suggestions: [
        "Publication may be under review",
        "Check your access permissions",
        "Verify the publication ID",
        "Try searching by title or author",
      ],
      color: "from-rose-500 to-pink-600",
    };
  }

  // Topics pages
  if (path.includes("/topics")) {
    return {
      title: "Topic Navigation Error",
      description:
        "Failed to load topic hierarchy. The topic structure may be updating.",
      icon: <FileX className="h-16 w-16" />,
      suggestions: [
        "Topic taxonomy may be refreshing",
        "Try browsing from the main topics page",
        "Check for recent topic reorganization",
        "Use search to find specific topics",
      ],
      color: "from-violet-500 to-purple-600",
    };
  }

  // Search pages
  if (path.includes("/search")) {
    return {
      title: "Search Error",
      description:
        "Your search query couldn't be processed. This may be due to search index maintenance.",
      icon: <Search className="h-16 w-16" />,
      suggestions: [
        "Try simplifying your search terms",
        "Use different keywords",
        "Check for special characters",
        "Try advanced search options",
      ],
      color: "from-cyan-500 to-blue-600",
    };
  }

  // Contact pages
  if (path.includes("/contact")) {
    return {
      title: "Contact Form Error",
      description:
        "Unable to submit your message. Our contact system may be temporarily down.",
      icon: <Mail className="h-16 w-16" />,
      suggestions: [
        "Try again in a few minutes",
        "Check your internet connection",
        "Verify all required fields are filled",
        "Contact us via email directly",
      ],
      color: "from-green-500 to-emerald-600",
    };
  }

  // About pages
  if (path.includes("/about")) {
    return {
      title: "Page Loading Error",
      description:
        "Failed to load about information. Some content may be unavailable.",
      icon: <AlertCircle className="h-16 w-16" />,
      suggestions: [
        "Content may be updating",
        "Try refreshing the page",
        "Check your browser compatibility",
        "Clear browser cache",
      ],
      color: "from-slate-500 to-gray-600",
    };
  }

  // Default error context
  return {
    title: "Unexpected Error",
    description:
      "Something unexpected happened. Our team has been notified and is working on a fix.",
    icon: <AlertCircle className="h-16 w-16" />,
    suggestions: [
      "Try refreshing the page",
      "Check your internet connection",
      "Clear your browser cache",
      "Try again in a few minutes",
    ],
    color: "from-red-500 to-rose-600",
  };
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Log error to error reporting service
    console.error("Error:", error);
  }, [error]);

  const errorContext = useMemo(
    () => getErrorContext(pathname || ""),
    [pathname]
  );

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div
          className={`w-full bg-gradient-blue rounded-t-3xl shadow-md p-12 text-white`}
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border-4 border-white/30">
                {errorContext.icon}
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="heading-1">{errorContext.title}</h1>
              <p className="subheading text-white/90!">
                {errorContext.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full bg-white rounded-b-3xl shadow-md p-6 space-y-10">
          {/* Error Details Card */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Error Details
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600 min-w-30">
                    Error Message:
                  </span>
                  <code className="flex-1 bg-red-50 text-red-700 px-4 py-2 rounded-lg font-mono text-xs break-all border border-red-200">
                    {error.message || "An unexpected error occurred"}
                  </code>
                </div>
                {error.digest && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="font-medium text-gray-600 min-w-30">
                      Error ID:
                    </span>
                    <code className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono text-xs break-all border border-gray-200">
                      {error.digest}
                    </code>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600 min-w-30">
                    Page Location:
                  </span>
                  <code className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-mono text-xs break-all border border-blue-200">
                    {pathname || "/"}
                  </code>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <span className="font-medium text-gray-600 min-w-30">
                    Timestamp:
                  </span>
                  <span className="text-gray-700">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
              Troubleshooting Steps
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {errorContext.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                >
                  <div className=" shrink-0">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <span className="text-gray-700 mb-0 leading-relaxed">
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t-2 border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => reset()}
                className=" text-white shadow-lg hover:shadow-xl transition-all duration-200 text-base py-5!"
              >
                <RefreshCcw className="mr-2 h-5 w-5" />
                Try Again
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className=" border-2 w-full text-base py-5!"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
              <Link href={"/"}>
                <Button
                  type="button"
                  variant="outline"
                  className=" border-2 w-full text-base py-5!"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home Page
                </Button>
              </Link>
              <Link href={"/contact"}>
                <Button
                  type="button"
                  variant="outline"
                  className=" border-2 w-full text-base py-5!"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 leading-relaxed">
              If this error persists, please{" "}
              <a
                href="/contact"
                className="text-primary font-medium underline underline-offset-2"
              >
                contact our support team
              </a>{" "}
              with the Error ID above for faster assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
