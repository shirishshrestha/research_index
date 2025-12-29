"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type {
  FilterToolbarProps,
  FilterToolbarSearchProps,
  FilterToolbarSelectProps,
  FilterToolbarDateInputProps,
  FilterToolbarRadioGroupProps,
  FilterToolbarSearchableRadioGroupProps,
  SelectOption,
  RadioOption,
} from "../utils/types";

const FilterToolbarContext = React.createContext<boolean | null>(null);

const useFilterToolbarContext = () => {
  const ctx = React.useContext(FilterToolbarContext);
  if (!ctx) {
    throw new Error(
      "FilterToolbar components must be used inside <FilterToolbar />"
    );
  }
};

export function FilterToolbar({
  children,
  className = "",
  containerClass = "",
}: FilterToolbarProps) {
  return (
    <FilterToolbarContext.Provider value={true}>
      <div className={`${className}`}>
        <div className={`flex flex-col gap-4 text-text-gray ${containerClass}`}>
          {children}
        </div>
      </div>
    </FilterToolbarContext.Provider>
  );
}

FilterToolbar.Search = function FilterToolbarSearch({
  label = "Search",
  placeholder = "Search...",
  value,
  onChange,
  paramName = "search",
  debounceMs = 500,
  className,
}: FilterToolbarSearchProps) {
  useFilterToolbarContext();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [localValue, setLocalValue] = React.useState(
    value ?? searchParams.get(paramName) ?? ""
  );

  const [debounced] = useDebounce(localValue, debounceMs);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounced) {
      params.set(paramName, debounced);
      params.delete("page");
    } else {
      params.delete(paramName);
    }

    router.push(`?${params.toString()}`, { scroll: false });
    onChange?.(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className={cn("flex-1", className)}>
      <label className="mb-2 block text-lg font-medium leading-6 text-text-black">
        {label}
      </label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
      </div>
    </div>
  );
};

FilterToolbar.Select = function FilterToolbarSelect({
  label,
  options = [],
  value,
  onChange,
  paramName,
  placeholder = "Select...",
  className,
}: FilterToolbarSelectProps) {
  useFilterToolbarContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = value ?? searchParams.get(paramName) ?? "";

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val && val !== "all") {
      params.set(paramName, val);
    } else {
      params.delete(paramName);
    }

    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
    onChange?.(val);
  };

  return (
    <div className={cn("flex-1", className)}>
      {label && (
        <label className="mb-2 block text-lg font-medium leading-6 text-text-black">
          {label}
        </label>
      )}

      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: SelectOption) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

FilterToolbar.DateInput = function FilterToolbarDateInput({
  label = "Date",
  value,
  onChange,
  paramName,
  className,
}: FilterToolbarDateInputProps) {
  useFilterToolbarContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = value ?? searchParams.get(paramName) ?? "";

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val) params.set(paramName, val);
    else params.delete(paramName);

    router.push(`?${params.toString()}`, { scroll: false });
    onChange?.(val);
  };

  return (
    <div className={cn("flex-1", className)}>
      <label className="mb-2 block text-lg font-medium leading-6 text-text-black">
        {label}
      </label>
      <Input
        type="date"
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

FilterToolbar.RadioGroup = function FilterToolbarRadioGroup({
  label,
  options = [],
  value,
  onChange,
  paramName,
  className,
  accordion = false,
  defaultOpen = true,
  showCard = true,
}: FilterToolbarRadioGroupProps) {
  useFilterToolbarContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = value ?? searchParams.get(paramName) ?? "";

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, val);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
    onChange?.(val);
  };

  const content = (
    <RadioGroup
      value={currentValue}
      onValueChange={handleChange}
      className="space-y-2"
    >
      {options.map((opt: RadioOption) => (
        <div key={opt.value} className="flex items-center gap-3">
          <RadioGroupItem value={opt.value} id={opt.value} />
          <Label htmlFor={opt.value} className="font-normal cursor-pointer">
            {opt.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const wrapper = showCard ? (
    <Card className={`shadow-none py-3! ${className}`}>
      <CardContent className="py-0 px-3">
        {accordion ? (
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen ? "item-1" : undefined}
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-lg font-roboto font-medium text-text-black hover:no-underline py-0">
                {label}
              </AccordionTrigger>
              <AccordionContent className="pt-4.5! pb-0!">
                {content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div className="space-y-3">
            <label className="block text-lg font-medium leading-6 text-text-black">
              {label}
            </label>
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  ) : (
    <div className={`space-y-3 ${className}`}>
      {accordion ? (
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen ? "item-1" : undefined}
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-lg font-roboto font-medium text-text-black hover:no-underline py-0">
              {label}
            </AccordionTrigger>
            <AccordionContent className="pt-4.5! pb-0!">
              {content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <label className="block text-lg font-medium leading-6 text-text-black">
            {label}
          </label>
          {content}
        </>
      )}
    </div>
  );

  return wrapper;
};

FilterToolbar.SearchableRadioGroup =
  function FilterToolbarSearchableRadioGroup({
    label,
    options = [],
    value,
    onChange,
    paramName,
    searchPlaceholder = "Search...",
    maxHeight = "max-h-64",
    className = "",
    accordion = false,
    defaultOpen = true,
    showCard = true,
  }: FilterToolbarSearchableRadioGroupProps) {
    useFilterToolbarContext();

    const router = useRouter();
    const searchParams = useSearchParams();
    const currentValue = value ?? searchParams.get(paramName) ?? "";
    const [query, setQuery] = React.useState("");

    const filtered = React.useMemo(() => {
      if (!query) return options;
      return options.filter((o: RadioOption) =>
        o.label.toLowerCase().includes(query.toLowerCase())
      );
    }, [query, options]);

    const handleChange = (val: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, val);
      params.delete("page");
      router.push(`?${params.toString()}`, { scroll: false });
      onChange?.(val);
    };

    const content = (
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <RadioGroup
          value={currentValue}
          onValueChange={handleChange}
          className={cn("space-y-2 gap-0 overflow-y-auto pr-2", maxHeight)}
        >
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found</p>
          )}

          {filtered.map((opt: RadioOption) => (
            <div key={opt.value} className="flex items-center gap-3">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label
                htmlFor={opt.value}
                className="font-normal leading-6 cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );

    const wrapper = showCard ? (
      <Card className={`shadow-none py-3! ${className}`}>
        <CardContent className="py-0 px-3">
          {accordion ? (
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultOpen ? "item-1" : undefined}
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="text-lg font-roboto font-medium text-text-black hover:no-underline py-0">
                  {label}
                </AccordionTrigger>
                <AccordionContent className="pt-4.5! pb-0!">
                  {content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="space-y-3">
              <label className="block text-lg font-medium leading-6 text-text-black">
                {label}
              </label>
              {content}
            </div>
          )}
        </CardContent>
      </Card>
    ) : (
      <div className={`space-y-3 ${className}`}>
        {accordion ? (
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen ? "item-1" : undefined}
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-lg font-roboto font-medium text-text-black hover:no-underline py-0">
                {label}
              </AccordionTrigger>
              <AccordionContent className="pt-4.5! pb-0!">
                {content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <>
            <label className="block text-lg font-medium leading-6 text-text-black">
              {label}
            </label>
            {content}
          </>
        )}
      </div>
    );

    return wrapper;
  };
