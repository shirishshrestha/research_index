import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "hero";
}

export function Breadcrumb({
  items,
  className = "",
  variant = "default",
}: BreadcrumbProps) {
  if (variant === "hero") {
    return (
      <nav className={`breadcrumb-bg px-6 py-4 ${className}`}>
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-white/60" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Default variant - simple breadcrumb
  return (
    <nav className={`py-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-[#023B8B] hover:text-[#012558] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to build breadcrumb chains
export function buildBreadcrumbs(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items;
}

// Common breadcrumb patterns
export const commonBreadcrumbs = {
  home: { label: "Research Index", href: "/" },
  search: { label: "Search", href: "/search" },
  advancedSearch: { label: "Advanced Search", href: "/search/advanced" },
  libraries: { label: "Libraries" },
  topics: { label: "Topics", href: "/search" },
  articles: { label: "Articles", href: "/articles" },
  journals: { label: "Journals", href: "/journals" },
  authors: { label: "Authors", href: "/authors" },
  institutions: { label: "Institutions", href: "/institutions" },
  about: { label: "About", href: "/about" },
  contact: { label: "Contact", href: "/contact" },
};
