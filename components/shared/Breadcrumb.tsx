import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`py-8.75 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1 text-base">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500" />}
            {item.href ? (
              <Link
                href={item.href}
                className={`${
                  items.length - 1 !== index ? "underline" : "text-text-black"
                } `}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${
                  items.length - 1 !== index ? "underline" : "text-text-black"
                } `}
              >
                {item.label}
              </span>
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
  contributors: { label: "Contributors" },
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
