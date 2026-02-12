"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

export interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  defaultValue = "",
  value,
  onChange,
  onSearch,
  onKeyDown,
  debounceMs = 500,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [debouncedValue] = useDebounce(
    value !== undefined ? value : internalValue,
    debounceMs,
  );

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  return (
    <Input
      type="text"
      name="search"
      value={value !== undefined ? value : internalValue}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`px-5! py-4! h-10.75 leading-7 rounded-lg bg-white text-text-black placeholder:text-gray-500 ${className}"`}
    />
  );
}
