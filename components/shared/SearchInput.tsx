"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

export interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  defaultValue = "",
  onSearch,
  debounceMs = 500,
  className,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [debouncedValue] = useDebounce(searchValue, debounceMs);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <Input
      type="text"
      name="search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder={placeholder}
      className={`px-5! py-4! h-10.75 leading-7 rounded-lg bg-white text-text-black placeholder:text-gray-500 ${className}"`}
    />
  );
}
