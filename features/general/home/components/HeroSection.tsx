"use client";

import { Container, SearchInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
// Use plain <img> for SVGs so CSS height/width behave predictably

const stats = [
  { value: 139, label: "Countries Represented" },
  { value: 22110, label: "Journals" },
  { value: 11699408, label: "Article Records" },
];

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"journals" | "articles">(
    "journals",
  );

  const handleSearch = (value?: string) => {
    const query = value !== undefined ? value : searchQuery;
    if (!query.trim()) return;

    // Build the search URL based on the selected type
    const searchParams = new URLSearchParams();
    searchParams.set("search", query.trim());

    // Redirect to the appropriate page based on search type
    if (searchType === "journals") {
      router.push(`/journals?${searchParams.toString()}`);
    } else {
      router.push(`/articles?${searchParams.toString()}`);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  return (
    <section className="section-padding text-white relative overflow-hidden bg-hero-gradient">
      <Container className="relative">
        <div className="grid lg:grid-cols-[2fr_1.1fr] gap-8 items-center">
          <div className="">
            <div className="space-y-5">
              <p className="text-sm md:text-lg font-normal">
                Nepal Open Research Hub
              </p>
              <h1 className="heading-1">
                Explore open access research publications, journals and
                scholarly articles.
              </h1>
            </div>

            {/* Search Type Selector (shadcn RadioGroup) */}
            <div className="flex gap-6 mt-8.75">
              <RadioGroup
                value={searchType}
                onValueChange={(v) =>
                  setSearchType(v as "journals" | "articles")
                }
                className="flex items-center gap-6"
              >
                <label
                  htmlFor="search-journals"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RadioGroupItem
                    id="search-journals"
                    value="journals"
                    className="border-secondary"
                    circleClass="fill-secondary"
                  />
                  <span className="text-base md:text-lg">Journals</span>
                </label>

                <label
                  htmlFor="search-articles"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RadioGroupItem
                    id="search-articles"
                    value="articles"
                    className="border-secondary"
                    circleClass="fill-secondary"
                  />
                  <span className="text-base md:text-lg font-normal">
                    Articles
                  </span>
                </label>
              </RadioGroup>
            </div>

            {/* Search Bar */}
            <div className="space-y-5 mt-15">
              <div className="flex gap-3">
                <SearchInput
                  placeholder={`Search ${searchType === "journals" ? "journals, publishers, ISSN" : "articles, authors, DOI"}...`}
                  onSearch={(value) => {
                    setSearchQuery(value);
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                    }
                  }}
                  debounceMs={0}
                  className="flex-1"
                />
                <Button size="lg" onClick={handleSearchClick} className="">
                  <Search size={20} />
                  Search
                </Button>
              </div>
              <Link
                href="/search/advanced"
                className="inline-flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4h12M4 8h8M6 12h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Advanced Search
              </Link>
            </div>

            {/* Statistics Counter */}
            <div className="grid grid-cols-3 gap-6 pt-12.5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${
                    index !== stats.length - 1
                      ? "border-r border-white/20 pr-6"
                      : ""
                  }`}
                >
                  <h3 className="heading-3 text-secondary mb-2">
                    {stat.value.toLocaleString()}
                  </h3>
                  <div className="sub-body text-white!">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Space for Structure */}
          <div className="hidden lg:block relative h-full">
            <Image
              width={500}
              height={500}
              src="/hero.svg"
              alt="shapes"
              className="absolute right-3 -top-20  h-180 xl:h-175 2xl:h-160 w-auto pointer-events-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
