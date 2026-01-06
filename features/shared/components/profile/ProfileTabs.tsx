"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { ProfileTabsProps } from "./types";

export function ProfileTabs({
  tabs,
  paramKey = "tab",
  moreOptions,
  clearParamsOnTabSwitch,
}: ProfileTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = searchParams.get(paramKey) ?? tabs?.[0]?.value ?? "";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, value);

    // If a map of params to clear was provided, remove them when switching away from their tab
    if (clearParamsOnTabSwitch) {
      Object.entries(clearParamsOnTabSwitch).forEach(
        ([tabValue, paramList]) => {
          if (value !== tabValue) {
            paramList.forEach((param) => params.delete(param));
          }
        }
      );
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full mt-7.5 pt-5 gap-0"
    >
      <div className=" border-b border-b-[#ccc] flex justify-between items-center mb-8.75">
        <TabsList className="bg-background flex gap-3 rounded-none pb-0 px-0">
          {tabs.map((tab) => {
            // If tab has dropdown items
            if (tab.dropdown && tab.dropdown.length > 0) {
              return (
                <DropdownMenu key={tab.value}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={
                        "relative capitalize pt-1! px-5 pb-3.75 rounded-none heading-para shadow-none! cursor-pointer flex items-center gap-1 before:content-[''] before:absolute before:left-0 before:rounded-sm before:bottom-0.75 before:h-0.5  before:w-full before:opacity-0 before:transition-opacity before:duration-200 data-[state=open]:before:opacity-100 data-[state=open]:before:bg-primary hover:text-primary"
                      }
                    >
                      {tab.label}
                      <ChevronDown size={16} className="stroke-[1.6px]" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-55 ">
                    {tab.dropdown.map((dropdownItem) => (
                      <DropdownMenuItem
                        key={dropdownItem.value}
                        onClick={() => handleTabChange(dropdownItem.value)}
                        className="cursor-pointer"
                      >
                        {dropdownItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            // Regular tab
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={
                  "relative capitalize px-5 pb-3.75 rounded-none heading-para shadow-none! cursor-pointer before:content-[''] before:absolute before:left-0 before:rounded-sm before:-bottom-0.75 before:h-0.5 before:w-full before:opacity-0 before:transition-opacity before:duration-200 data-[state=active]:before:opacity-100 data-[state=active]:before:bg-primary"
                }
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {moreOptions && <div>{moreOptions}</div>}
      </div>

      {/* Render all tab contents */}
      {tabs.map((tab) => {
        // If tab has dropdown items, render each dropdown item's content
        if (tab.dropdown && tab.dropdown.length > 0) {
          return tab.dropdown.map((dropdownItem) => (
            <TabsContent
              key={dropdownItem.value}
              value={dropdownItem.value}
              className="w-full"
            >
              {dropdownItem.content}
            </TabsContent>
          ));
        }

        // Regular tab content
        return (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            {tab.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
