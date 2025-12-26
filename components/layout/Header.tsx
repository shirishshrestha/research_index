"use client";

import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Header() {
  const [contributorsOpen, setContributorsOpen] = useState(false);
  const [librariesOpen, setLibrariesOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "#023B8B" }}
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            RESEARCH INDEX
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {/* Contributors Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-sm font-medium text-white transition-colors hover:text-white/80"
              onMouseEnter={() => setContributorsOpen(true)}
              onMouseLeave={() => setContributorsOpen(false)}
            >
              <span>Contributors</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {contributorsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                onMouseEnter={() => setContributorsOpen(true)}
                onMouseLeave={() => setContributorsOpen(false)}
              >
                <Link
                  href="/authors"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Authors
                </Link>
                <Link
                  href="/institutions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Institutions
                </Link>
              </div>
            )}
          </div>

          {/* Libraries Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-sm font-medium text-white transition-colors hover:text-white/80"
              onMouseEnter={() => setLibrariesOpen(true)}
              onMouseLeave={() => setLibrariesOpen(false)}
            >
              <span>Libraries</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {librariesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                onMouseEnter={() => setLibrariesOpen(true)}
                onMouseLeave={() => setLibrariesOpen(false)}
              >
                <Link
                  href="/articles"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Articles
                </Link>
                <Link
                  href="/journals"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Journals
                </Link>
                <Link
                  href="/search"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Topics
                </Link>
              </div>
            )}
          </div>

          {/* About */}
          <Link
            href="/about"
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Contact
          </Link>

          {/* Search Icon */}
          <Link
            href="/search"
            className="text-white hover:text-white/80"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="flex items-center space-x-1 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            <span>Login</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L10 2L8 4M8 0L6 2L8 4M8 0V12M0 12L2 10L4 12M0 12L2 14L4 12M0 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>

          {/* Support Dropdown - Placeholder */}
          <div className="relative group">
            <button className="flex items-center space-x-1 text-sm font-medium text-white transition-colors hover:text-white/80">
              <span>Support</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
