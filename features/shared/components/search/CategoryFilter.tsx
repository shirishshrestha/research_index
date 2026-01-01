"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CategoryFilterProps } from "../../utils";

export const CategoryFilter = ({
  categories,
  paramName = "category",
}: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeCategory = searchParams.get(paramName) || categories[0]?.value;

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => {
        const isActive = activeCategory === category.value;
        return (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            aria-pressed={isActive}
            aria-label={`Filter by ${category.label}`}
            className={`w-full text-left p-2.5 rounded transition-all ${
              isActive
                ? "border border-[#F2F2F2] bg-[#F1F4FC]"
                : "border border-transparent hover:bg-gray-50"
            }`}
          >
            <span className="text-base text-text-black">
              {category.label}{" "}
              <span className="text-text-gray">({category.count})</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
