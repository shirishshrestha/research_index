"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { ProfileTabsProps } from "./types";

export function ProfileTabs({
  tabs,
  paramKey = "tab",
  moreOptions,
}: ProfileTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = searchParams.get(paramKey) ?? tabs?.[0]?.value ?? "";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, value);

    // Remove category param when switching away from research tab
    if (value !== "research" && params.has("category")) {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full mt-7.5 pt-5 "
    >
      <div className=" border-b border-b-[#ccc] flex justify-between items-center mb-8.75">
        <TabsList className="bg-background flex gap-3 rounded-none pb-0 px-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={
                "relative capitalize px-5 pb-3.75 rounded-none heading-para shadow-none! cursor-pointer before:content-[''] before:absolute before:left-0 before:rounded-sm before:-bottom-0.75 before:h-0.5 before:w-full before:opacity-0 before:transition-opacity before:duration-200 data-[state=active]:before:opacity-100 data-[state=active]:before:bg-primary"
              }
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {moreOptions && <div>{moreOptions}</div>}
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-full">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
