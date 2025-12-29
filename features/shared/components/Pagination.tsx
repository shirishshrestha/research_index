/**
 * Pagination Component
 */

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { PaginationProps } from "../utils/types";

/**
 * Pagination Component
 *
 * @param {Object} props
 * @param {number} props.currentPage - Current page number (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalCount - Total number of items
 * @param {number} props.pageSize - Items per page
 * @param {Function} props.onPageChange - Callback when page changes (page) => void
 * @param {Function} props.onPageSizeChange - Callback when page size changes (size) => void
 * @param {Array<number>} props.pageSizeOptions - Available page size options
 * @param {boolean} props.showPageSizeSelector - Show page size selector (default: true)
 * @param {boolean} props.showPageInfo - Show page info text (default: true)
 * @param {boolean} props.showFirstLast - Show first/last page buttons (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelector = true,
  showPageInfo = true,
  showFirstLast = true,
  className = "",
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // If onPageChange callback is provided, use it
      if (onPageChange) {
        onPageChange(page);
      } else {
        // Otherwise, use router to update URL
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  };

  const handlePageSizeChange = (size: string) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(size));
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show subset with ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalCount === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
        {/* First Page Button */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrevious}
            className="h-8 w-8"
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Previous Page Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="h-8 w-8"
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin max-w-full sm:max-w-none">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page as number)}
                className="h-8 min-w-8 px-2 sm:px-3 text-xs sm:text-sm"
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="h-8 w-8"
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page Button */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={!canGoNext}
            className="h-8 w-8"
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Page Size Selector */}
      {showPageSizeSelector && (
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Items per page:
          </span>
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
